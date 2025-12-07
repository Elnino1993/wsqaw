"use client"

import type React from "react"

import { useState, useEffect } from "react"

type Cell = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

export function MinesweeperContent() {
  const [grid, setGrid] = useState<Cell[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [time, setTime] = useState(0)
  const [flags, setFlags] = useState(0)

  const ROWS = 9
  const COLS = 9
  const MINES = 10

  useEffect(() => {
    initGame()
  }, [])

  useEffect(() => {
    if (gameOver || won) return

    const timer = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameOver, won])

  const initGame = () => {
    const newGrid: Cell[][] = []

    for (let i = 0; i < ROWS; i++) {
      newGrid[i] = []
      for (let j = 0; j < COLS; j++) {
        newGrid[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        }
      }
    }

    let minesPlaced = 0
    while (minesPlaced < MINES) {
      const row = Math.floor(Math.random() * ROWS)
      const col = Math.floor(Math.random() * COLS)
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true
        minesPlaced++
      }
    }

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!newGrid[i][j].isMine) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di
              const nj = j + dj
              if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && newGrid[ni][nj].isMine) {
                count++
              }
            }
          }
          newGrid[i][j].neighborMines = count
        }
      }
    }

    setGrid(newGrid)
    setGameOver(false)
    setWon(false)
    setTime(0)
    setFlags(0)
  }

  const handleClick = (row: number, col: number) => {
    if (gameOver || won || grid[row][col].isRevealed || grid[row][col].isFlagged) return

    const newGrid = [...grid.map((r) => [...r])]

    if (newGrid[row][col].isMine) {
      newGrid[row][col].isRevealed = true
      setGrid(newGrid)
      setGameOver(true)
      return
    }

    revealCell(newGrid, row, col)
    setGrid(newGrid)
    checkWin(newGrid)
  }

  const revealCell = (grid: Cell[][], row: number, col: number) => {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return
    if (grid[row][col].isRevealed || grid[row][col].isFlagged) return

    grid[row][col].isRevealed = true

    if (grid[row][col].neighborMines === 0) {
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          revealCell(grid, row + di, col + dj)
        }
      }
    }
  }

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    if (gameOver || won || grid[row][col].isRevealed) return

    const newGrid = [...grid.map((r) => [...r])]
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged
    setGrid(newGrid)
    setFlags((prev) => (newGrid[row][col].isFlagged ? prev + 1 : prev - 1))
  }

  const checkWin = (grid: Cell[][]) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!grid[i][j].isMine && !grid[i][j].isRevealed) return
      }
    }
    setWon(true)
  }

  return (
    <div className="flex flex-col items-center p-4 h-full">
      <div className="flex justify-between items-center w-full max-w-md mb-4 p-2 bg-gray-300 border-2 border-white border-b-gray-800 border-r-gray-800">
        <div className="bg-black text-red-500 px-2 py-1 font-mono font-bold border border-gray-600">
          {String(MINES - flags).padStart(3, "0")}
        </div>
        <button
          onClick={initGame}
          className="w-8 h-8 text-xl"
          style={{
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
            borderRight: "2px solid #000",
            borderBottom: "2px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          {gameOver ? "💀" : won ? "😎" : "🙂"}
        </button>
        <div className="bg-black text-red-500 px-2 py-1 font-mono font-bold border border-gray-600">
          {String(time).padStart(3, "0")}
        </div>
      </div>

      <div
        className="inline-grid gap-0 border-2 border-gray-800"
        style={{ gridTemplateColumns: `repeat(${COLS}, 20px)` }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
              onContextMenu={(e) => handleRightClick(e, i, j)}
              className="w-5 h-5 text-xs font-bold flex items-center justify-center"
              style={{
                borderTop: cell.isRevealed ? "1px solid #808080" : "2px solid #fff",
                borderLeft: cell.isRevealed ? "1px solid #808080" : "2px solid #fff",
                borderRight: cell.isRevealed ? "1px solid #808080" : "2px solid #808080",
                borderBottom: cell.isRevealed ? "1px solid #808080" : "2px solid #808080",
                backgroundColor: cell.isRevealed ? (cell.isMine && gameOver ? "red" : "#bdbdbd") : "#c0c0c0",
                color:
                  cell.neighborMines === 1
                    ? "blue"
                    : cell.neighborMines === 2
                      ? "green"
                      : cell.neighborMines === 3
                        ? "red"
                        : "black",
              }}
            >
              {cell.isFlagged ? "🚩" : cell.isRevealed ? (cell.isMine ? "💣" : cell.neighborMines || "") : ""}
            </button>
          )),
        )}
      </div>
    </div>
  )
}
