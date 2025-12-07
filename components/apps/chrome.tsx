"use client"

import { useState } from "react"

export function ChromeContent() {
  const [url, setUrl] = useState("")
  const [loadedUrl, setLoadedUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGo = async () => {
    if (!url) return

    setIsLoading(true)
    setLoadedUrl("")

    setTimeout(() => {
      setLoadedUrl(url.startsWith("http") ? url : `https://${url}`)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-300 p-2 border-b border-gray-400 flex gap-2 items-center flex-shrink-0">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGo()}
          placeholder="Enter URL..."
          className="flex-1 px-2 py-1 text-sm border border-gray-600 outline-none"
        />
        <button
          onClick={handleGo}
          className="px-3 py-1 text-sm"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          Go
        </button>
      </div>
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300">
            <img
              src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/000/948/341/datas/original.gif"
              alt="Loading"
              className="w-32 h-32 mb-4"
            />
            <p className="text-sm">Connecting...</p>
          </div>
        )}
        {loadedUrl && !isLoading && <iframe src={loadedUrl} className="w-full h-full border-none" title="Browser" />}
        {!loadedUrl && !isLoading && (
          <div className="flex items-center justify-center h-full text-gray-500">Enter a URL to browse</div>
        )}
      </div>
    </div>
  )
}
