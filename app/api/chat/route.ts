import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured. Please add it to your environment variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    const { messages } = await req.json()

    // Validate messages
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request format. 'messages' must be an array." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    try {
      const result = streamText({
        model: openai("gpt-3.5-turbo"),
        system: `
          You are EliezerCleaning's AI assistant, a helpful and knowledgeable virtual representative for a premium cleaning service business in Satu Mare, Romania.

          Your responsibilities:
          - Provide information about EliezerCleaning's services, pricing, and availability
          - Help customers book cleaning appointments
          - Answer questions about cleaning methods and products
          - Offer cleaning tips and advice
          - Handle customer inquiries professionally and courteously

          Services offered by EliezerCleaning:
          1. Detailing Auto Premium - Interior cleaning, upholstery cleaning, disinfection, dashboard protection
          2. Curățare Covoare & Tapițerie - Deep steam cleaning, stain removal, disinfection
          3. Igienizare & Dezinfectare - Professional disinfection for commercial and residential spaces
          4. Curățare Mobilier & Suprafețe - Specialized care for furniture and delicate surfaces
          5. Servicii la Domiciliu - Complete home cleaning services

          Always respond in Romanian unless specifically asked to use another language.
          Be friendly, professional, and helpful at all times.
          If you don't know the answer to a specific question about pricing or availability, suggest the customer contact the office directly at +40 755 322 752.
        `,
        messages,
      })

      return result.toDataStreamResponse()
    } catch (openaiError) {
      console.error("OpenAI API Error:", openaiError)
      return new Response(
        JSON.stringify({
          error: "Error communicating with OpenAI API. Please check your API key and try again.",
          details: openaiError.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }
  } catch (error) {
    console.error("General Error in chat API:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
