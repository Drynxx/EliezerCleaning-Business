import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          success: false,
          error: "OpenAI API key is not configured",
        },
        { status: 500 },
      )
    }

    // Simple test to verify the API key works
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: "Say hello in Romanian",
    })

    return Response.json({
      success: true,
      message: text,
    })
  } catch (error) {
    console.error("OpenAI API test error:", error)

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      },
      { status: 500 },
    )
  }
}
