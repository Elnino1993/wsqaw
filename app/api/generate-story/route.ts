import { generateText } from "ai"

export async function POST() {
  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt:
        "Write a short creative story (250-300 words) with an unexpected twist ending. Make it engaging and suitable for all ages.",
    })

    return Response.json({ story: text })
  } catch (error) {
    return Response.json({ story: "Failed to generate story." }, { status: 500 })
  }
}
