"use client"

import type React from "react"

import { useState } from "react"
import { Phone, MapPin, Mail, ExternalLink, Copy, Check, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContactMethod {
  icon: React.ReactNode
  label: string
  value: string
  action: "call" | "map" | "email" | "copy"
  link?: string
}

export function QuickContact() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const contactMethods: ContactMethod[] = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Telefon",
      value: "+40 755 322 752",
      action: "call",
      link: "tel:+40755322752",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Adresă",
      value: "Satu Mare, România",
      action: "map",
      link: "https://maps.google.com/?q=Satu+Mare,Romania",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@eliezercleaning.ro",
      action: "email",
      link: "mailto:contact@eliezercleaning.ro",
    },
  ]

  const handleAction = (method: ContactMethod) => {
    if (method.action === "copy") {
      navigator.clipboard.writeText(method.value)
      setCopiedValue(method.value)
      setTimeout(() => setCopiedValue(null), 2000)
    } else if (method.link) {
      window.open(method.link, "_blank")
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 className="text-2xl font-bold">Contact Rapid</h3>
          <p className="text-blue-100 mt-2">Contactați-ne rapid pentru orice informații sau programări</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors duration-200"
                onClick={() => handleAction(method)}
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3 text-blue-600 dark:text-blue-400">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{method.label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{method.value}</p>
                  </div>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {method.action === "copy" ? (
                          copiedValue === method.value ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {method.action === "call"
                        ? "Apelează"
                        : method.action === "map"
                          ? "Deschide harta"
                          : method.action === "email"
                            ? "Trimite email"
                            : copiedValue === method.value
                              ? "Copiat!"
                              : "Copiază"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-lg mb-4">Social Media</h4>
          <div className="flex gap-4">
            <motion.a
              href="https://www.facebook.com/profile.php?id=61565136025145"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/eliezer.cleaning/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 bg-pink-50 dark:bg-pink-900/30 p-3 rounded-lg text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-800/50 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </motion.a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
