"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface QuickReply {
  id: string
  text: string
  action: string
}

export function CleaningAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bună ziua! Sunt asistentul virtual EliezerCleaning. Cum vă pot ajuta astăzi cu serviciile noastre de curățenie?",
      timestamp: new Date(),
    },
  ])
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    { id: "prices", text: "Prețuri servicii", action: "prices" },
    { id: "booking", text: "Programare curățenie", action: "booking" },
    { id: "car", text: "Detailing auto", action: "car" },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      let newQuickReplies: QuickReply[] = []

      // Simple keyword matching for demo purposes
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("pret") || lowerInput.includes("cost") || lowerInput.includes("tarif")) {
        response =
          "Prețurile noastre variază în funcție de tipul de serviciu și dimensiunea spațiului. Pentru curățenie rezidențială, prețurile încep de la 150 RON, iar pentru detailing auto de la 200 RON. Doriți o estimare personalizată?"
        newQuickReplies = [
          { id: "estimate", text: "Estimare personalizată", action: "estimate" },
          { id: "home", text: "Curățenie casă", action: "home" },
          { id: "car", text: "Detailing auto", action: "car" },
        ]
      } else if (lowerInput.includes("program") || lowerInput.includes("rezerv")) {
        response =
          "Puteți face o programare direct pe site folosind formularul de rezervare, sau ne puteți contacta telefonic la numărul +40 755 322 752. Care este serviciul pentru care doriți să faceți o programare?"
        newQuickReplies = [
          { id: "home", text: "Curățenie casă", action: "home" },
          { id: "car", text: "Detailing auto", action: "car" },
          { id: "office", text: "Curățenie birou", action: "office" },
        ]
      } else if (lowerInput.includes("auto") || lowerInput.includes("masina") || lowerInput.includes("detailing")) {
        response =
          "Serviciul nostru de detailing auto include curățare interioară completă, aspirare, curățare tapițerie, lustruire bord și plastic, precum și opțiuni premium precum polish și ceruire. Prețurile încep de la 200 RON pentru mașini mici. Când ați dori să programați un detailing auto?"
        newQuickReplies = [
          { id: "car-booking", text: "Programare detailing", action: "car-booking" },
          { id: "car-prices", text: "Detalii prețuri", action: "car-prices" },
          { id: "contact", text: "Contact telefonic", action: "contact" },
        ]
      } else {
        response =
          "Vă mulțumim pentru mesaj! Oferim servicii complete de curățenie pentru case, apartamente, birouri și mașini. Cum vă putem ajuta mai exact astăzi?"
        newQuickReplies = [
          { id: "services", text: "Servicii disponibile", action: "services" },
          { id: "booking", text: "Programare curățenie", action: "booking" },
          { id: "contact", text: "Contact", action: "contact" },
        ]
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setQuickReplies(newQuickReplies)
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message with quick reply text
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: reply.text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Handle different quick reply actions
    setTimeout(() => {
      let response = ""
      let newQuickReplies: QuickReply[] = []

      switch (reply.action) {
        case "prices":
          response =
            "Iată prețurile noastre de bază:\n\n• Curățenie apartament: de la 150 RON\n• Curățenie casă: de la 250 RON\n• Detailing auto: de la 200 RON\n• Curățenie birou: de la 15 RON/mp\n\nPrețul final depinde de dimensiune și serviciile specifice. Doriți o estimare personalizată?"
          newQuickReplies = [
            { id: "estimate", text: "Estimare personalizată", action: "estimate" },
            { id: "booking", text: "Programare curățenie", action: "booking" },
          ]
          break
        case "booking":
          response =
            "Pentru a programa un serviciu de curățenie, vă rugăm să ne spuneți ce tip de serviciu doriți și data preferată. Alternativ, puteți folosi formularul de rezervare de pe site sau ne puteți contacta telefonic la +40 755 322 752."
          newQuickReplies = [
            { id: "home", text: "Curățenie casă", action: "home" },
            { id: "car", text: "Detailing auto", action: "car" },
            { id: "office", text: "Curățenie birou", action: "office" },
          ]
          break
        case "car":
          response =
            "Serviciul nostru de detailing auto include:\n\n• Aspirare completă interior\n• Curățare și hidratare tapițerie\n• Curățare și protecție bord și plastic\n• Curățare geamuri interior/exterior\n• Opțional: polish și ceruire, tratament piele\n\nDoriți să programați un detailing auto sau aveți întrebări specifice?"
          newQuickReplies = [
            { id: "car-booking", text: "Programare detailing", action: "car-booking" },
            { id: "car-prices", text: "Detalii prețuri", action: "car-prices" },
          ]
          break
        case "estimate":
          response =
            "Pentru o estimare personalizată, vă rugăm să ne spuneți:\n\n1. Tipul de serviciu dorit\n2. Dimensiunea aproximativă a spațiului\n3. Orice cerințe speciale\n\nAlternativ, puteți folosi calculatorul nostru inteligent de preț din secțiunea Rezervare."
          newQuickReplies = [
            { id: "calculator", text: "Calculator preț", action: "calculator" },
            { id: "contact", text: "Contact telefonic", action: "contact" },
          ]
          break
        default:
          response = "Vă mulțumim pentru interesul acordat serviciilor noastre! Cum vă putem ajuta mai departe?"
          newQuickReplies = [
            { id: "services", text: "Servicii disponibile", action: "services" },
            { id: "booking", text: "Programare curățenie", action: "booking" },
            { id: "contact", text: "Contact", action: "contact" },
          ]
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setQuickReplies(newQuickReplies)
      setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 z-50 flex items-center justify-center transition-all duration-300 hover:scale-105"
        size="icon"
        aria-label="Open chat"
      >
        <Bot className="h-7 w-7" />
        <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] z-50"
          >
            <Card className="shadow-2xl border-blue-200 dark:border-blue-800 overflow-hidden h-[500px] flex flex-col">
              <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Asistent EliezerCleaning</h3>
                    <p className="text-xs text-blue-100">Disponibil 24/7</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700/50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden">
                <div className="h-[350px] overflow-y-auto p-4 space-y-4">
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
                          "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-line",
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                            : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                        )}
                      >
                        {message.content}
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarFallback className="bg-gray-200 dark:bg-gray-700">U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/logo.png" alt="EliezerCleaning" />
                        <AvatarFallback className="bg-blue-600 text-white">EC</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isTyping && quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply.id}
                          variant="outline"
                          size="sm"
                          className="rounded-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply.text}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t bg-gray-50 dark:bg-gray-900">
                <div className="flex gap-2 w-full">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrieți un mesaj..."
                    className="min-h-10 resize-none border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
