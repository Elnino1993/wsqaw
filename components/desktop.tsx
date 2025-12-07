"use client"

interface DesktopProps {
  onOpenApp: (appName: string) => void
}

const DESKTOP_ICONS = [
  { id: "myComputer", name: "My Computer", icon: "https://storage.googleapis.com/gemini-95-icons/mycomputer.png" },
  { id: "myArt", name: "My Art", icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" },
  { id: "aboutMe", name: "About Me.txt", icon: "https://win98icons.alexmeub.com/icons/png/notepad_file-0.png" },
]

const SOCIAL_ICONS = [
  { id: "twitter", name: "X (Twitter)", url: "https://x.com/OxVentura" },
  { id: "telegram", name: "Telegram", url: "https://t.me/OxVentura" },
]

export function Desktop({ onOpenApp }: DesktopProps) {
  return (
    <div className="p-4 flex flex-wrap content-start gap-4">
      {DESKTOP_ICONS.map((icon) => (
        <button
          key={icon.id}
          onClick={() => onOpenApp(icon.id)}
          onDoubleClick={() => onOpenApp(icon.id)}
          className="flex flex-col items-center w-24 cursor-pointer hover:bg-blue-900/30 p-2 rounded"
        >
          <img src={icon.icon || "/placeholder.svg"} alt={icon.name} className="w-12 h-12 mb-2" />
          <span className="text-white text-xs text-center drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">{icon.name}</span>
        </button>
      ))}

      <div className="fixed bottom-12 left-4 flex gap-4">
        {SOCIAL_ICONS.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center w-24 cursor-pointer hover:bg-blue-900/30 p-2 rounded"
          >
            <div
              className="w-12 h-12 mb-2 flex items-center justify-center"
              style={{
                borderTop: "2px solid #fff",
                borderLeft: "2px solid #fff",
                borderRight: "2px solid #000",
                borderBottom: "2px solid #000",
                backgroundColor: "#c0c0c0",
              }}
            >
              {social.id === "twitter" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              )}
            </div>
            <span className="text-white text-xs text-center drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
