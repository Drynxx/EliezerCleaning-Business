"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function ApiKeyWarning() {
  const [showOpenAIWarning, setShowOpenAIWarning] = useState(false)
  const [showHuggingFaceWarning, setShowHuggingFaceWarning] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if API keys are configured
    async function checkApiKeys() {
      try {
        const response = await fetch("/api/check-api-keys")
        const data = await response.json()
        setShowOpenAIWarning(!data.openaiConfigured)
        setShowHuggingFaceWarning(!data.huggingfaceConfigured)
      } catch (error) {
        setShowOpenAIWarning(true)
        setShowHuggingFaceWarning(true)
      } finally {
        setChecking(false)
      }
    }

    checkApiKeys()
  }, [])

  if (checking) return null

  return (
    <div className="space-y-4">
      {showOpenAIWarning && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>OpenAI API Key Missing</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              OpenAI API key is not configured. You can still use the free Hugging Face model, but for better results,
              add your OpenAI API key.
            </p>
            <ol className="list-decimal ml-4 space-y-1 text-sm">
              <li>
                Create a file named <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code> in the
                root of your project
              </li>
              <li>
                Add{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                  OPENAI_API_KEY=your_openai_api_key_here
                </code>{" "}
                to the file
              </li>
              <li>Restart your development server</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.open("https://platform.openai.com/api-keys", "_blank")}
            >
              Get OpenAI API Key
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {showHuggingFaceWarning && (
        <Alert variant="warning" className="mb-4 border-yellow-500 dark:border-yellow-600">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <AlertTitle>Hugging Face API Key Missing</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Hugging Face API key is not configured. The free AI model option may not work properly.
            </p>
            <ol className="list-decimal ml-4 space-y-1 text-sm">
              <li>
                Create a file named <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code> in the
                root of your project
              </li>
              <li>
                Add{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                  HUGGINGFACE_API_KEY=your_huggingface_api_key_here
                </code>{" "}
                to the file
              </li>
              <li>Restart your development server</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.open("https://huggingface.co/settings/tokens", "_blank")}
            >
              Get Hugging Face API Key
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
