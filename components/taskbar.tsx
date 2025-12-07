"use client"

interface TaskbarProps {
  openApps: Set<string>
  activeWindow: string | null
  minimizedApps: Set<string>
  onStartClick: () => void
  onTaskbarClick: (appName: string) => void
  startMenuOpen: boolean
}

const APP_NAMES: Record<string, { name: string; icon: string }> = {
  myComputer: { name: "My Gemtop", icon: "https://storage.googleapis.com/gemini-95-icons/mycomputer.png" },
  notepad: { name: "GemNotes", icon: "https://storage.googleapis.com/gemini-95-icons/GemNotes.png" },
  paint: { name: "GemPaint", icon: "https://storage.googleapis.com/gemini-95-icons/gempaint.png" },
  chrome: { name: "Chrome", icon: "https://storage.googleapis.com/gemini-95-icons/chrome-icon-2.png" },
  gemini: { name: "Gemini Chat", icon: "https://storage.googleapis.com/gemini-95-icons/GeminiChatRetro.png" },
  minesweeper: { name: "GemSweeper", icon: "https://storage.googleapis.com/gemini-95-icons/gemsweeper.png" },
  mediaPlayer: { name: "GemPlayer", icon: "https://storage.googleapis.com/gemini-95-icons/ytmediaplayer.png" },
  doom: {
    name: "Doom II",
    icon: "https://64.media.tumblr.com/1d89dfa76381e5c14210a2149c83790d/7a15f84c681c1cf9-c1/s540x810/86985984be99d5591e0cbc0dea6f05ffa3136dac.png",
  },
}

export function Taskbar({
  openApps,
  activeWindow,
  minimizedApps,
  onStartClick,
  onTaskbarClick,
  startMenuOpen,
}: TaskbarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-9 bg-gray-300 flex items-center px-1 gap-1"
      style={{
        borderTop: "2px solid #fff",
        zIndex: 100,
      }}
    >
      <button
        onClick={onStartClick}
        className="h-7 px-2 flex items-center gap-1 font-bold text-sm"
        style={{
          borderTop: startMenuOpen ? "1px solid #000" : "2px solid #fff",
          borderLeft: startMenuOpen ? "1px solid #000" : "2px solid #fff",
          borderRight: startMenuOpen ? "1px solid #fff" : "2px solid #000",
          borderBottom: startMenuOpen ? "1px solid #fff" : "2px solid #000",
          backgroundColor: "#c0c0c0",
        }}
      >
        <img src="https://storage.googleapis.com/gemini-95-icons/windows.png" alt="Start" className="w-5 h-5" />
        Start
      </button>

      <div className="flex-1 flex gap-1 overflow-hidden">
        {Array.from(openApps).map((appName) => {
          const app = APP_NAMES[appName]
          if (!app) return null

          const isActive = activeWindow === appName && !minimizedApps.has(appName)

          return (
            <button
              key={appName}
              onClick={() => onTaskbarClick(appName)}
              className="h-7 px-2 flex items-center gap-1 text-xs max-w-[150px] truncate"
              style={{
                borderTop: isActive ? "1px solid #000" : "1px solid #fff",
                borderLeft: isActive ? "1px solid #000" : "1px solid #fff",
                borderRight: isActive ? "1px solid #fff" : "1px solid #000",
                borderBottom: isActive ? "1px solid #fff" : "1px solid #000",
                backgroundColor: isActive ? "#e0e0e0" : "#c0c0c0",
              }}
            >
              <img src={app.icon || "/placeholder.svg"} alt={app.name} className="w-4 h-4" />
              {app.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
