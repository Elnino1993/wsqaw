"use client"

import { useState } from "react"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { StartMenu } from "@/components/start-menu"
import { WindowManager } from "@/components/window-manager"

export default function Page() {
  const [openApps, setOpenApps] = useState<Set<string>>(new Set())
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [minimizedApps, setMinimizedApps] = useState<Set<string>>(new Set())
  const [showStartMenu, setShowStartMenu] = useState(false)

  const handleOpenApp = (appName: string) => {
    setOpenApps((prev) => new Set(prev).add(appName))
    setMinimizedApps((prev) => {
      const next = new Set(prev)
      next.delete(appName)
      return next
    })
    setActiveWindow(appName)
    setShowStartMenu(false)
  }

  const handleCloseApp = (appName: string) => {
    setOpenApps((prev) => {
      const next = new Set(prev)
      next.delete(appName)
      return next
    })
    setMinimizedApps((prev) => {
      const next = new Set(prev)
      next.delete(appName)
      return next
    })
    if (activeWindow === appName) {
      setActiveWindow(null)
    }
  }

  const handleMinimizeApp = (appName: string) => {
    setMinimizedApps((prev) => new Set(prev).add(appName))
    if (activeWindow === appName) {
      setActiveWindow(null)
    }
  }

  const handleTaskbarClick = (appName: string) => {
    if (minimizedApps.has(appName)) {
      setMinimizedApps((prev) => {
        const next = new Set(prev)
        next.delete(appName)
        return next
      })
      setActiveWindow(appName)
    } else if (activeWindow === appName) {
      handleMinimizeApp(appName)
    } else {
      setActiveWindow(appName)
    }
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-teal-600">
      <Desktop onOpenApp={handleOpenApp} />

      <WindowManager
        openApps={openApps}
        activeWindow={activeWindow}
        minimizedApps={minimizedApps}
        onClose={handleCloseApp}
        onMinimize={handleMinimizeApp}
        onActivate={setActiveWindow}
      />

      <StartMenu isOpen={showStartMenu} onOpenApp={handleOpenApp} onClose={() => setShowStartMenu(false)} />

      <Taskbar
        openApps={openApps}
        activeWindow={activeWindow}
        minimizedApps={minimizedApps}
        onStartClick={() => setShowStartMenu((prev) => !prev)}
        onTaskbarClick={handleTaskbarClick}
        startMenuOpen={showStartMenu}
      />
    </main>
  )
}
