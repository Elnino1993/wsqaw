"use client"

import type React from "react"

import { type ReactNode, useRef, useEffect, useState } from "react"

interface WindowProps {
  appName: string
  title: string
  width: number
  height: number
  isActive: boolean
  isMinimized: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  children: ReactNode
}

export function Window({
  title,
  width,
  height,
  isActive,
  isMinimized,
  onClose,
  onMinimize,
  onActivate,
  children,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 100, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return

    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    onActivate()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      setPosition({
        x: e.clientX - dragStart.current.x,
        y: Math.max(0, e.clientY - dragStart.current.y),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col bg-gray-300 shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        width,
        height,
        zIndex: isActive ? 50 : 10,
        borderTop: "2px solid #fff",
        borderLeft: "2px solid #fff",
        borderRight: "2px solid #000",
        borderBottom: "2px solid #000",
      }}
      onClick={onActivate}
    >
      <div
        className="bg-blue-900 text-white px-1 py-0.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
        style={{ height: 22 }}
        onMouseDown={handleMouseDown}
      >
        <span className="text-xs font-bold truncate">{title}</span>
        <div className="window-controls flex gap-1">
          <button
            onClick={onMinimize}
            className="w-4 h-4 bg-gray-300 text-black flex items-center justify-center text-xs font-bold hover:bg-gray-400"
            style={{
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            _
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-gray-300 text-black flex items-center justify-center text-xs font-bold hover:bg-gray-400"
            style={{
              borderTop: "1px solid #fff",
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white m-0.5 border border-gray-400">{children}</div>
    </div>
  )
}
