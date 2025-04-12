"use client"

import { Facebook, Instagram, Phone, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function FloatingSocialButtons() {
  const [isExpanded, setIsExpanded] = useState(false)

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  }

  const mainButtonVariants = {
    initial: { rotate: 0 },
    expanded: { rotate: 180 },
  }

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col items-end">
      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isExpanded ? "expanded" : "initial"}
        variants={mainButtonVariants}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300 mb-3"
        aria-label="Toggle social buttons"
      >
        <ChevronUp className="h-6 w-6 text-white" />
      </motion.button>

      {/* Social buttons container */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 overflow-hidden"
          >
            {/* Phone button */}
            <motion.a
              href="tel:+40755322752"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5 text-white" />
            </motion.a>

            {/* Facebook button */}
            <motion.a
              href="https://www.facebook.com/profile.php?id=61565136025145"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, delay: 0.2 }}
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-white" />
            </motion.a>

            {/* Instagram button */}
            <motion.a
              href="https://www.instagram.com/eliezer.cleaning/"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, delay: 0.3 }}
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-white" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
