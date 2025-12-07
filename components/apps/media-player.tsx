export function MediaPlayerContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-full h-64 bg-black flex items-center justify-center mb-4">
        <p className="text-white text-sm">GemPlayer - Coming Soon</p>
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 text-sm"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          ▶️
        </button>
        <button
          className="px-3 py-1 text-sm"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          ⏸️
        </button>
        <button
          className="px-3 py-1 text-sm"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          ⏹️
        </button>
      </div>
    </div>
  )
}
