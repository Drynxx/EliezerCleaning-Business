"use client"

import { useState } from "react"
import { SmartBookingWizard } from "./smart-booking-wizard"
import { Notification } from "./notification"

export function PriceCalculatorSection() {
  const [notification, setNotification] = useState<{
    show: boolean
    title: string
    message: string
    variant: "success" | "error" | "warning" | "info"
  }>({
    show: false,
    title: "",
    message: "",
    variant: "success",
  })

  const handleBookingComplete = (data: any) => {
    console.log("Booking data:", data)
    // In a real implementation, this would submit the booking data to your backend
    setNotification({
      show: true,
      title: "Rezervare completată!",
      message: `Rezervarea pentru ${
        data.serviceType === "home"
          ? "Curățenie Casă/Apartament"
          : data.serviceType === "car"
            ? "Detailing Auto"
            : "Curățenie Birou/Spațiu Comercial"
      } a fost trimisă cu succes! Vă vom contacta în curând pentru confirmare.`,
      variant: "success",
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {notification.show && (
        <Notification
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}

      <SmartBookingWizard onComplete={handleBookingComplete} />
    </div>
  )
}
