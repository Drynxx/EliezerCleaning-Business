"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import "@/app/animations.css"

const notificationVariants = cva(
  "fixed z-50 max-w-md w-full animate-slide-in-right rounded-lg shadow-xl overflow-hidden border",
  {
    variants: {
      variant: {
        success: "bg-white dark:bg-gray-800 border-green-200 dark:border-green-900",
        error: "bg-white dark:bg-gray-800 border-red-200 dark:border-red-900",
        warning: "bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-900",
        info: "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-900",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
      },
    },
    defaultVariants: {
      variant: "success",
      position: "top-right",
    },
  },
)

export interface NotificationProps extends VariantProps<typeof notificationVariants> {
  title: string
  message: string
  onClose: () => void
  duration?: number
}

export function Notification({
  title,
  message,
  variant = "success",
  position = "top-right",
  onClose,
  duration = 5000,
}: NotificationProps) {
  // Auto-close after specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
      case "error":
        return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
      case "warning":
        return <CheckCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
      case "info":
        return <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      default:
        return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
    }
  }

  const getProgressColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className={cn(notificationVariants({ variant, position }))}>
      <div className="p-4 flex items-start">
        <div
          className={cn(
            "flex-shrink-0 p-2 rounded-full",
            variant === "success" && "bg-green-100 dark:bg-green-900",
            variant === "error" && "bg-red-100 dark:bg-red-900",
            variant === "warning" && "bg-yellow-100 dark:bg-yellow-900",
            variant === "info" && "bg-blue-100 dark:bg-blue-900",
          )}
        >
          {getIcon()}
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className={`h-1 animate-shrink ${getProgressColor()}`} style={{ animationDuration: `${duration}ms` }} />
    </div>
  )
}
