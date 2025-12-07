"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"

const COLORS = ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]
const SIZES = [2, 5, 10, 15]

export function PaintContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#000000")
  const [size, setSize] = useState(5)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== "mousedown") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    ctx.fill()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-300 p-2 border-b border-gray-400 flex gap-4 items-center flex-shrink-0">
        <div className="flex gap-1 border border-gray-600 p-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-5 h-5 border border-black"
              style={{
                backgroundColor: c,
                borderWidth: color === c ? 2 : 1,
              }}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className="px-2 py-1 text-xs"
              style={{
                borderTop: size === s ? "1px solid #000" : "1px solid #fff",
                borderLeft: size === s ? "1px solid #000" : "1px solid #fff",
                borderRight: size === s ? "1px solid #fff" : "1px solid #000",
                borderBottom: size === s ? "1px solid #fff" : "1px solid #000",
                backgroundColor: "#c0c0c0",
              }}
            >
              {s}px
            </button>
          ))}
        </div>
        <button
          onClick={clearCanvas}
          className="px-2 py-1 text-xs ml-auto"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={650}
        height={450}
        className="flex-1 cursor-crosshair bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  )
}
