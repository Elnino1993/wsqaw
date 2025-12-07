import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: message,
    })

    return Response.json({ response: text })
  } catch (error) {
    return Response.json({ response: "Sorry, I encountered an error." }, { status: 500 })
  }
}
