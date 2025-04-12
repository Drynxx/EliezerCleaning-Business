"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light") // Default to light theme

  useEffect(() => {
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem("theme") as Theme

    if (savedTheme === "dark") {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      // Default to light theme if no saved theme or saved theme is 'light'
      setTheme("light")
      document.documentElement.classList.remove("dark")
      // Ensure 'light' is saved in localStorage
      if (savedTheme !== "light") {
        localStorage.setItem("theme", "light")
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"

    // Update state
    setTheme(newTheme)

    // Save to localStorage
    localStorage.setItem("theme", newTheme)

    // Update DOM
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
