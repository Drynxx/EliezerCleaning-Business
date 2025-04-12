export async function GET() {
  return Response.json({
    openaiConfigured: !!process.env.OPENAI_API_KEY,
    huggingfaceConfigured: !!process.env.HUGGINGFACE_API_KEY,
  })
}
