import { StreamingTextResponse } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Extract the last user message
    const lastUserMessage = messages.filter((msg: any) => msg.role === "user").pop()?.content || ""

    // Prepare the system prompt
    const systemPrompt = `
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
    `

    // Combine system prompt and user message
    const prompt = `${systemPrompt}\n\nUser: ${lastUserMessage}\n\nAssistant:`

    // Call Hugging Face Inference API
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY || ""}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
        },
        options: {
          use_cache: false,
          wait_for_model: true,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Hugging Face API error: ${JSON.stringify(error)}`)
    }

    // Create a TransformStream to convert the response to a streaming format
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    // Process the response
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error("Response body is null")
    }

    // Read the response stream
    const processStream = async () => {
      try {
        const { value, done } = await reader.read()
        if (done) {
          await writer.close()
          return
        }

        // Convert the chunk to text
        const text = new TextDecoder().decode(value)
        let result

        try {
          // Try to parse as JSON
          result = JSON.parse(text)
          const generatedText = result[0]?.generated_text || ""

          // Write the chunk to the output stream
          await writer.write(new TextEncoder().encode(generatedText))
        } catch (e) {
          // If not valid JSON, just write the raw text
          await writer.write(new TextEncoder().encode(text))
        }

        // Continue reading
        processStream()
      } catch (error) {
        console.error("Error processing stream:", error)
        await writer.abort(error as Error)
      }
    }

    // Start processing the stream
    processStream()

    // Return a streaming response
    return new StreamingTextResponse(readable)
  } catch (error) {
    console.error("Error in Hugging Face chat API:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
