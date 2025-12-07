"use client"

interface StartMenuProps {
  isOpen: boolean
  onOpenApp: (appName: string) => void
  onClose: () => void
}

const MENU_ITEMS = [
  { id: "myComputer", name: "My Computer" },
  { id: "myArt", name: "My Art" },
  { id: "aboutMe", name: "About Me.txt" },
]

export function StartMenu({ isOpen, onOpenApp, onClose }: StartMenuProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed bottom-9 left-0 w-48 bg-gray-300 flex flex-col p-0.5 z-50"
        style={{
          borderTop: "2px solid #fff",
          borderLeft: "2px solid #fff",
          borderRight: "2px solid #000",
          borderBottom: "2px solid #000",
          boxShadow: "2px 2px 3px rgba(0,0,0,0.4)",
        }}
      >
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenApp(item.id)}
            className="text-left px-3 py-1.5 text-sm hover:bg-blue-900 hover:text-white whitespace-nowrap"
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  )
}
