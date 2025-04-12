"use client"

import { CheckCircle, X } from "lucide-react"
import { useEffect } from "react"
import "@/app/animations.css"

interface SuccessNotificationProps {
  message: string
  onClose: () => void
}

export function SuccessNotification({ message, onClose }: SuccessNotificationProps) {
  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-slide-in-right">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-green-200 dark:border-green-900">
        <div className="p-4 flex items-start">
          <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Succes!</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="bg-green-500 h-1 animate-shrink" />
      </div>
    </div>
  )
}
