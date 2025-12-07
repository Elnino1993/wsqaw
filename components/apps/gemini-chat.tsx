"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export function GeminiChatContent() {
  const [messages, setMessages] = useState<Message[]>([{ role: "system", content: "Gemini AI Ready. Start chatting!" }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "Error getting response" }])
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to get response from AI" }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-2">
      <div ref={historyRef} className="flex-1 overflow-y-auto border border-gray-400 p-2 mb-2 bg-white">
        {messages.map((msg, i) => (
          <p
            key={i}
            className="mb-1 text-sm"
            style={{
              color: msg.role === "user" ? "blue" : msg.role === "assistant" ? "green" : "gray",
              fontWeight: msg.role === "user" ? "bold" : "normal",
            }}
          >
            {msg.role === "user" ? "You: " : msg.role === "assistant" ? "Gemini: " : ""}
            {msg.content}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
          className="flex-1 px-2 py-1 text-sm border border-black"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="px-3 py-1 text-sm disabled:opacity-50"
          style={{
            borderTop: "1px solid #fff",
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            backgroundColor: "#c0c0c0",
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
