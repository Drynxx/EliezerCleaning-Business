"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartBookingWizard } from "./smart-booking-wizard"
import { CleaningAssistant } from "./cleaning-assistant"
import { BeforeAfterSlider } from "./before-after-slider"
import { AvailabilityCalendar } from "./availability-calendar"
import { Calculator, MessageSquare, Images, Calendar } from "lucide-react"

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("calculator")

  const handleBookingComplete = (data: any) => {
    console.log("Booking data:", data)
    // In a real implementation, this would submit the booking data to your backend
    alert("Rezervare completată! Vă mulțumim!")
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Funcționalități Avansate</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Descoperiți instrumentele noastre interactive pentru o experiență îmbunătățită
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="calculator" className="flex flex-col items-center py-3 gap-2">
            <Calculator className="h-5 w-5" />
            <span>Calculator Preț</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex flex-col items-center py-3 gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Asistent Virtual</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex flex-col items-center py-3 gap-2">
            <Images className="h-5 w-5" />
            <span>Rezultate</span>
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex flex-col items-center py-3 gap-2">
            <Calendar className="h-5 w-5" />
            <span>Disponibilitate</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader>
              <CardTitle>Calculator Inteligent de Preț</CardTitle>
              <CardDescription>
                Estimați rapid costul serviciului de curățenie în funcție de nevoile dumneavoastră
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmartBookingWizard onComplete={handleBookingComplete} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader>
              <CardTitle>Asistent Virtual 24/7</CardTitle>
              <CardDescription>
                Obțineți răspunsuri instant la întrebările dumneavoastră despre serviciile noastre
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-full max-w-md h-[500px]">
                <CleaningAssistant />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Apăsați pe butonul din colțul din dreapta jos pentru a deschide asistentul virtual
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BeforeAfterSlider
              beforeImage="/placeholder.svg?height=400&width=600"
              afterImage="/car-cleaning.jpeg"
              title="Detailing Auto Premium"
              description="Vedeți transformarea completă a interiorului mașinii"
            />
            <BeforeAfterSlider
              beforeImage="/placeholder.svg?height=400&width=600"
              afterImage="/placeholder.svg?height=400&width=600"
              title="Curățare Canapea"
              description="Rezultate remarcabile pentru mobilierul tapițat"
            />
          </div>
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityCalendar />
        </TabsContent>
      </Tabs>
    </div>
  )
}
