"use client"

import type React from "react"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  recommended?: boolean
  onBookNow: () => void
}

export function ServiceCard({ title, description, features, icon, recommended = false, onBookNow }: ServiceCardProps) {
  return (
    <Card
      className={`h-full transition-all duration-300 overflow-hidden ${
        recommended ? "border-blue-500 dark:border-blue-400 shadow-md" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full"
          >
            {icon}
          </motion.div>
          {recommended && (
            <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
              Recomandat
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </CardHeader>
      <CardContent className="pb-6">
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex items-start"
            >
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-200">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={onBookNow}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Rezervă Acum
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}
