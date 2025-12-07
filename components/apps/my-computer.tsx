export function MyComputerContent() {
  const folders = [
    { name: "My Documents", icon: "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" },
    { name: "My Pictures", icon: "https://win98icons.alexmeub.com/icons/png/folder_picture-0.png" },
    { name: "Control Panel", icon: "https://win98icons.alexmeub.com/icons/png/settings_gear-0.png" },
    { name: "Recycle Bin", icon: "https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-1.png" },
  ]

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {folders.map((folder) => (
        <div
          key={folder.name}
          className="flex flex-col items-center w-20 p-2 hover:bg-blue-900 hover:text-white cursor-pointer"
        >
          <img src={folder.icon || "/placeholder.svg"} alt={folder.name} className="w-8 h-8 mb-1" />
          <span className="text-xs text-center">{folder.name}</span>
        </div>
      ))}
    </div>
  )
}
