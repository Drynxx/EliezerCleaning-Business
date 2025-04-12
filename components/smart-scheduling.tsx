"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ro } from "date-fns/locale"

interface TimeSlot {
  time: string
  available: boolean
  optimal: boolean
}

export function SmartScheduling() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState("")
  const [service, setService] = useState("")
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isGeneratingSlots, setIsGeneratingSlots] = useState(false)

  useEffect(() => {
    if (date && location && service) {
      setIsGeneratingSlots(true)
      setSelectedTime(null)

      // Simulate AI generating optimal time slots
      setTimeout(() => {
        // Generate time slots between 8 AM and 6 PM
        const slots: TimeSlot[] = []
        for (let hour = 8; hour <= 18; hour++) {
          // Skip lunch hour
          if (hour !== 13) {
            const time = `${hour}:00`
            // Randomly determine availability and optimal slots
            const available = Math.random() > 0.3
            const optimal = available && Math.random() > 0.6

            slots.push({ time, available, optimal })
          }
        }

        setTimeSlots(slots)
        setIsGeneratingSlots(false)
      }, 1500)
    }
  }, [date, location, service])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would submit the booking
    alert(`Programare confirmată pentru ${format(date!, "PPP", { locale: ro })} la ora ${selectedTime}`)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          Programare Inteligentă
        </CardTitle>
        <CardDescription>
          Sistemul nostru AI vă recomandă cele mai bune intervale orare în funcție de locație și disponibilitate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Serviciu</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Selectați serviciul dorit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Curățenie Standard</SelectItem>
                <SelectItem value="deep">Curățenie Profundă</SelectItem>
                <SelectItem value="move">Curățenie După Renovare</SelectItem>
                <SelectItem value="office">Curățenie Birouri</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Locație</Label>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="flex-1">
                  <SelectValue placeholder="Selectați zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centru">Centru</SelectItem>
                  <SelectItem value="nord">Zona de Nord</SelectItem>
                  <SelectItem value="est">Zona de Est</SelectItem>
                  <SelectItem value="vest">Zona de Vest</SelectItem>
                  <SelectItem value="sud">Zona de Sud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ro }) : "Selectați data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={
                    (date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || date.getDay() === 0 // Disable Sundays
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {timeSlots.length > 0 && (
            <div className="space-y-2">
              <Label>Intervale Orare Disponibile</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className={cn(
                      "relative",
                      !slot.available && "opacity-50 cursor-not-allowed",
                      slot.optimal && !selectedTime && "ring-2 ring-blue-500",
                    )}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {slot.time}
                    {slot.optimal && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] px-1 rounded-full">
                        Optim
                      </div>
                    )}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">
                Intervalele marcate cu "Optim" sunt recomandate de AI pentru eficiență maximă
              </p>
            </div>
          )}

          {isGeneratingSlots && (
            <div className="text-center py-4 text-sm text-gray-500">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Generăm cele mai bune intervale orare pentru dumneavoastră...
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!date || !location || !service || !selectedTime} onClick={handleSubmit}>
          Confirmă Programarea <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
