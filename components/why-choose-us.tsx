"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Clock, Award, Sparkles, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

export function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const features: FeatureItem[] = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Servicii garantate și asigurate",
      description:
        "Toate serviciile noastre sunt garantate și asigurate. Dacă nu sunteți mulțumiți, revenim gratuit pentru a remedia situația.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Program flexibil, 7 zile din 7",
      description:
        "Suntem disponibili șapte zile pe săptămână, cu program flexibil adaptat nevoilor dumneavoastră. Programări chiar și în weekend!",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Personal calificat și verificat",
      description:
        "Echipa noastră este formată din profesioniști calificați, verificați și cu experiență în domeniul curățeniei.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Echipamente și produse premium",
      description:
        "Utilizăm doar echipamente profesionale și produse de curățenie premium, eficiente și sigure pentru sănătatea dumneavoastră.",
    },
  ]

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 className="text-2xl font-bold">De ce să ne alegi?</h3>
          <p className="text-blue-100 mt-2">
            Descoperă avantajele care ne diferențiază și fac din serviciile noastre alegerea perfectă pentru tine
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-lg transition-all duration-300 overflow-hidden ${
                  activeFeature === index
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                    : "bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                }`}
              >
                <div
                  className="flex items-center p-4 cursor-pointer"
                  onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                >
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      activeFeature === index
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      activeFeature === index ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 text-gray-600 dark:text-gray-300 border-t border-blue-100 dark:border-blue-900/30">
                        {feature.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
