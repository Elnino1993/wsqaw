"use client"

import { useState } from "react"

type FolderItem = {
  name: string
  icon: string
  preview?: string
  isFolder?: boolean
  children?: FolderItem[]
}

export function MyArtContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState<string[]>([])

  const artworks: FolderItem[] = [
    {
      name: "Canton Network",
      icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png",
      isFolder: true,
      children: [
        {
          name: "Ukrainian Bird",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/canton-ukrainian-bird.png",
        },
        {
          name: "Christmas Beaver",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/canton-christmas-beaver.png",
        },
        {
          name: "Halloween Cat",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/canton-halloween-cat.png",
        },
      ],
    },
    {
      name: "Creek Finance",
      icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png",
      isFolder: true,
      children: [
        {
          name: "Beach Beavers",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/creek-beach-beavers.png",
        },
        {
          name: "Miner Beaver",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/creek-miner-beaver.png",
        },
        {
          name: "Creek Beaver",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/creek-beaver.png",
        },
      ],
    },
    {
      name: "Neura",
      icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png",
      isFolder: true,
      children: [
        {
          name: "Parachutist",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/neura-parachutist.png",
        },
      ],
    },
    {
      name: "Shelby",
      icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png",
      isFolder: true,
      children: [
        {
          name: "GM Blue",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/shelby-gm-blue.png",
        },
        {
          name: "V Cubes",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/shelby-v-cubes.png",
        },
        {
          name: "GM Blue Large",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/shelby-gm-blue-large.png",
        },
        {
          name: "GN Pink",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/shelby-gn-pink.png",
        },
        {
          name: "Heart",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/shelby-heart.png",
        },
        {
          name: "GN Pink 2",
          icon: "https://win98icons.alexmeub.com/icons/png/paint_file-1.png",
          preview: "/shelby-gn-pink-2.png",
        },
      ],
    },
  ]

  const getCurrentItems = (): FolderItem[] => {
    let items = artworks
    for (const folder of currentPath) {
      const found = items.find((item) => item.name === folder && item.isFolder)
      if (found?.children) {
        items = found.children
      }
    }
    return items
  }

  const handleItemClick = (item: FolderItem) => {
    if (item.isFolder) {
      setCurrentPath([...currentPath, item.name])
      setSelectedImage(null)
    } else if (item.preview) {
      setSelectedImage(item.preview)
    }
  }

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1))
    setSelectedImage(null)
  }

  const currentItems = getCurrentItems()

  return (
    <div className="flex h-full">
      <div className="w-1/2 p-4 flex flex-col gap-2 overflow-y-auto border-r-2 border-gray-800">
        <div className="win95-panel p-2 mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackClick}
              disabled={currentPath.length === 0}
              className="win95-button px-3 py-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <div className="flex-1 bg-white border-2 border-gray-600 px-2 py-1 text-xs">
              My Art{currentPath.length > 0 ? " > " + currentPath.join(" > ") : ""}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 content-start">
          {currentItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center w-20 p-2 hover:bg-blue-900 hover:text-white cursor-pointer ${
                selectedImage === item.preview ? "bg-blue-900 text-white" : ""
              }`}
            >
              <img src={item.icon || "/placeholder.svg"} alt={item.name} className="w-8 h-8 mb-1" />
              <span className="text-xs text-center">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-1/2 p-4 flex items-center justify-center bg-gray-200">
        {selectedImage ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected artwork"
              className="max-w-full max-h-[400px] border-2 border-gray-800 shadow-lg"
            />
            <div className="win95-panel p-2 text-center">
              <p className="text-sm">Click on an artwork to view it</p>
            </div>
          </div>
        ) : (
          <div className="win95-panel p-4 text-center">
            <p className="text-sm text-gray-600">
              {currentPath.length > 0
                ? "Select an artwork from the left to view it"
                : "Select a folder or artwork from the left"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
