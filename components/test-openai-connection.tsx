"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function TestOpenAIConnection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const testConnection = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/test-openai")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message || "Connection successful!")
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to connect to OpenAI API")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Error testing connection")
      console.error("Error testing OpenAI connection:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={testConnection} disabled={status === "loading"} variant="outline">
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing connection...
          </>
        ) : (
          "Test OpenAI Connection"
        )}
      </Button>

      {status === "success" && (
        <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-900/20">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
