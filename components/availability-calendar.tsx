"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { ro } from "date-fns/locale"

interface TimeSlot {
  time: string
  available: boolean
}

export function AvailabilityCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Generate available time slots for the selected date
  // In a real implementation, this would come from your backend
  const getTimeSlots = (date: Date | undefined): TimeSlot[] => {
    if (!date) return []

    // Example: Generate time slots from 8 AM to 6 PM
    const slots: TimeSlot[] = []
    const day = date.getDay()

    // Fewer slots on weekends
    const startHour = 8
    const endHour = day === 6 ? 14 : 18 // Saturday ends at 2 PM

    for (let hour = startHour; hour < endHour; hour++) {
      // Add slots every hour
      slots.push({
        time: `${hour}:00`,
        // Randomly mark some slots as unavailable for demo purposes
        available: Math.random() > 0.3,
      })
    }

    return slots
  }

  const timeSlots = date ? getTimeSlots(date) : []

  const handleBooking = () => {
    if (!date || !selectedTime) return

    // In a real implementation, this would call your booking API
    alert(`Rezervare confirmată pentru ${format(date, "PPP", { locale: ro })} la ora ${selectedTime}`)
  }

  return (
    <Card className="shadow-lg border-blue-100 dark:border-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Disponibilitate
        </CardTitle>
        <CardDescription>Verificați disponibilitatea și rezervați rapid un serviciu de curățenie</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Selectați data</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              disabled={(date) => {
                // Disable past dates and Sundays
                const now = new Date()
                now.setHours(0, 0, 0, 0)
                return date < now || date.getDay() === 0
              }}
              initialFocus
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Intervale orare disponibile</h3>
            {date ? (
              timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className={`flex items-center justify-center ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-gray-500 dark:text-gray-400">
                    Nu există intervale disponibile pentru această dată
                  </p>
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-40 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                <p className="text-gray-500 dark:text-gray-400">Selectați o dată pentru a vedea disponibilitatea</p>
              </div>
            )}

            {date && selectedTime && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Slot disponibil</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {format(date, "PPP", { locale: ro })} la ora {selectedTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          disabled={!date || !selectedTime}
          onClick={handleBooking}
        >
          Rezervă Acum
        </Button>
      </CardFooter>
    </Card>
  )
}
