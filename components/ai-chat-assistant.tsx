"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Loader2, ImageIcon, Sparkles, AlertCircle, Settings } from "lucide-react"
import { useChat } from "ai/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { ModelSelector, type ModelType } from "./model-selector"
import { Label } from "@/components/ui/label"

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<ModelType>("openai")

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error: chatError,
    reload,
    setInput,
  } = useChat({
    api: selectedModel === "openai" ? "/api/chat" : "/api/chat-huggingface",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content:
          "Bună ziua! Sunt asistentul virtual EliezerCleaning. Cum vă pot ajuta astăzi cu serviciile noastre de curățenie?",
      },
    ],
    onError: (err) => {
      console.error("Chat error:", err)
      let errorMessage = "A apărut o eroare. Vă rugăm încercați din nou."

      // Try to extract more specific error message if available
      if (err instanceof Error) {
        errorMessage = err.message || errorMessage
      } else if (typeof err === "object" && err !== null) {
        errorMessage = err.toString() || errorMessage
      }

      setError(errorMessage)
    },
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Show tooltip after 3 seconds if chat is not open
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowTooltip(false)
    }
  }, [isOpen])

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendWithImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (imageFile) {
      // In a real implementation, you would upload the image to your server
      // and then send the URL to the AI model
      append({
        role: "user",
        content: input + (input ? "\n\n" : "") + "[Imagine încărcată pentru evaluare]",
      })

      // Simulate AI analyzing the image
      setTimeout(() => {
        append({
          role: "assistant",
          content:
            "Am analizat imaginea încărcată. Bazat pe suprafața vizibilă, recomand serviciul nostru de curățenie profesională care include aspirare, ștergere praf, și curățare pardoseli. Timpul estimat: 3-4 ore. Doriți să programați o vizită pentru o evaluare detaliată?",
        })
      }, 2000)

      setImageFile(null)
      setImagePreview(null)
      setInput("")
    } else {
      handleSubmit(e)
    }
  }

  const retryChat = () => {
    setError(null)
    reload()
  }

  const handleModelChange = (model: ModelType) => {
    setSelectedModel(model)
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 z-50 flex items-center justify-center transition-all duration-300 hover:scale-105"
              size="icon"
              aria-label="Open chat"
            >
              <Bot className="h-7 w-7" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg"
          >
            <div className="flex items-center gap-2 py-1">
              <Sparkles className="h-4 w-4" />
              <p>Întrebați asistentul nostru AI!</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[550px] z-50 shadow-2xl flex flex-col border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden">
          <CardHeader className="p-0">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Asistent EliezerCleaning</h3>
                  <p className="text-xs text-blue-100">
                    {selectedModel === "openai" ? "Powered by OpenAI" : "Powered by Hugging Face (Free)"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700/50">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Chat Settings</SheetTitle>
                      <SheetDescription>Configure your AI assistant settings</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="model">AI Model</Label>
                        <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} />
                        <p className="text-xs text-muted-foreground mt-2">
                          {selectedModel === "openai"
                            ? "OpenAI provides higher quality responses but requires an API key."
                            : "Hugging Face is free to use but may provide lower quality responses."}
                        </p>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button>Save Changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700/50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 relative">
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/logo.png" alt="EliezerCleaning" />
                        <AvatarFallback className="bg-blue-600 text-white">EC</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 max-w-[80%] shadow-sm",
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                          : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                      )}
                    >
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700">U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/logo.png" alt="EliezerCleaning" />
                      <AvatarFallback className="bg-blue-600 text-white">EC</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <Alert variant="destructive" className="mx-2">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription className="text-sm">
                      {error}
                      <Button variant="outline" size="sm" onClick={retryChat} className="ml-2 h-6 mt-1">
                        Încearcă din nou
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t bg-gray-50 dark:bg-gray-900">
            {imagePreview && (
              <div className="absolute bottom-[72px] left-4 bg-white dark:bg-gray-800 rounded-md shadow-md p-1 border border-gray-200 dark:border-gray-700">
                <div className="relative w-20 h-20">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview(null)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            <form onSubmit={handleSendWithImage} className="flex gap-2 w-full">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </Button>
              <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Scrieți un mesaj..."
                className="min-h-10 resize-none border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || (!input.trim() && !imageFile)}
                className="shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
