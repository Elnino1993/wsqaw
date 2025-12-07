"use client"

import { Window } from "./window"
import { MyComputerContent } from "./apps/my-computer"
import { MyArtContent } from "./apps/my-art"
import { AboutMeContent } from "./apps/about-me"

interface WindowManagerProps {
  openApps: Set<string>
  activeWindow: string | null
  minimizedApps: Set<string>
  onClose: (appName: string) => void
  onMinimize: (appName: string) => void
  onActivate: (appName: string) => void
}

const APP_CONFIG: Record<string, { title: string; width: number; height: number; icon: string }> = {
  myComputer: {
    title: "My Computer",
    width: 500,
    height: 400,
    icon: "https://storage.googleapis.com/gemini-95-icons/mycomputer.png",
  },
  myArt: {
    title: "My Art",
    width: 700,
    height: 500,
    icon: "https://win98icons.alexmeub.com/icons/png/folder_picture-0.png",
  },
  aboutMe: {
    title: "About Me.txt - Notepad",
    width: 600,
    height: 450,
    icon: "https://win98icons.alexmeub.com/icons/png/notepad-0.png",
  },
}

export function WindowManager({
  openApps,
  activeWindow,
  minimizedApps,
  onClose,
  onMinimize,
  onActivate,
}: WindowManagerProps) {
  const renderContent = (appName: string) => {
    switch (appName) {
      case "myComputer":
        return <MyComputerContent />
      case "myArt":
        return <MyArtContent />
      case "aboutMe":
        return <AboutMeContent />
      default:
        return <div className="p-4">App content coming soon...</div>
    }
  }

  return (
    <>
      {Array.from(openApps).map((appName) => {
        const config = APP_CONFIG[appName]
        if (!config) return null

        return (
          <Window
            key={appName}
            appName={appName}
            title={config.title}
            width={config.width}
            height={config.height}
            isActive={activeWindow === appName}
            isMinimized={minimizedApps.has(appName)}
            onClose={() => onClose(appName)}
            onMinimize={() => onMinimize(appName)}
            onActivate={() => onActivate(appName)}
          >
            {renderContent(appName)}
          </Window>
        )
      })}
    </>
  )
}
