"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AICleaningAssessment } from "./ai-cleaning-assessment"
import { AIRecommendations } from "./ai-recommendations"
import { SmartScheduling } from "./smart-scheduling"
import { Brain, Camera, Sparkles, Calendar, Bot, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ApiKeyWarning } from "./api-key-warning"
import { TestOpenAIConnection } from "./test-openai-connection"

export function AIHub() {
  const [activeTab, setActiveTab] = useState("assessment")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.div className="w-full" initial="hidden" animate="visible" variants={fadeIn}>
      <ApiKeyWarning />
      <div className="mb-6">
        <TestOpenAIConnection />
      </div>
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
          <Brain className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Asistentul AI EliezerCleaning</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl text-center">
          Tehnologia noastră AI vă ajută să obțineți servicii personalizate și eficiente, adaptate perfect nevoilor
          dumneavoastră
        </p>
      </div>

      <Card className="border-blue-100 dark:border-blue-900/30 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-t-lg pb-6">
          <CardTitle className="text-center text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Alegeți instrumentul AI potrivit pentru nevoile dumneavoastră
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Experimentați puterea inteligenței artificiale pentru a obține cele mai bune servicii de curățenie
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-blue-50 dark:bg-gray-800 p-1">
              <TabsTrigger
                value="assessment"
                className="flex flex-col items-center py-3 px-4 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                <Camera className="h-5 w-5" />
                <span>Evaluare Spațiu</span>
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="flex flex-col items-center py-3 px-4 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                <Sparkles className="h-5 w-5" />
                <span>Recomandări</span>
              </TabsTrigger>
              <TabsTrigger
                value="scheduling"
                className="flex flex-col items-center py-3 px-4 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                <Calendar className="h-5 w-5" />
                <span>Programare</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assessment" className="mt-0">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/5 rounded-lg mb-6 border border-blue-100 dark:border-blue-900/20">
                <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
                  <Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Evaluare Spațiu cu AI
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Încărcați o fotografie a spațiului dumneavoastră și sistemul nostru AI va analiza suprafața, tipul de
                  curățenie necesară și va genera recomandări personalizate.
                </p>
              </div>
              <AICleaningAssessment />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-0">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/5 rounded-lg mb-6 border border-blue-100 dark:border-blue-900/20">
                <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Recomandări Personalizate
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Răspundeți la câteva întrebări simple și AI-ul nostru va genera recomandări personalizate pentru
                  serviciile de curățenie potrivite nevoilor dumneavoastră.
                </p>
              </div>
              <AIRecommendations />
            </TabsContent>

            <TabsContent value="scheduling" className="mt-0">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/5 rounded-lg mb-6 border border-blue-100 dark:border-blue-900/20">
                <h3 className="font-semibold flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Programare Inteligentă
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Sistemul nostru AI analizează programul echipelor, locațiile și traficul pentru a vă recomanda cele
                  mai eficiente intervale orare pentru serviciile de curățenie.
                </p>
              </div>
              <SmartScheduling />
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-start gap-4 text-white shadow-lg">
            <div className="bg-white/20 p-2 rounded-full flex-shrink-0">
              <Bot className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-lg mb-1">Asistent Virtual 24/7</h4>
              <p className="text-sm text-blue-100 mb-4">
                Pentru asistență personalizată în timp real, folosiți asistentul nostru virtual disponibil non-stop.
                Puteți pune întrebări despre servicii, prețuri sau programări.
              </p>
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => {
                  // Find the chat button and click it
                  const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement
                  if (chatButton) chatButton.click()
                }}
              >
                Deschide Asistentul Virtual <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
