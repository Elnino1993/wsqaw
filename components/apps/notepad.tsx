"use client"

import { useState } from "react"

export function NotepadContent() {
  const [text, setText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateStory = async () => {
    setIsGenerating(true)
    setText((prev) => prev + "\n\nGenerating AI story...\n\n")

    try {
      const response = await fetch("/api/generate-story", { method: "POST" })
      const data = await response.json()
      setText((prev) => prev + data.story + "\n\n")
    } catch (error) {
      setText((prev) => prev + "Error generating story.\n\n")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-300 p-1 border-b border-gray-400 flex-shrink-0">
        <button
          onClick={generateStory}
          disabled={isGenerating}
          className="px-2 py-1 text-xs bg-gray-300 disabled:opacity-50"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
          }}
        >
          {isGenerating ? "Working..." : "Generate Story"}
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 font-mono text-sm resize-none border-none outline-none"
        placeholder="Start typing..."
      />
    </div>
  )
}
