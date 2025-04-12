"use client"

import type React from "react"

import {
  Sparkles,
  Clock,
  MapPin,
  Phone,
  BrushIcon as Broom,
  Star,
  Menu,
  X,
  Award,
  Shield,
  Users,
  Facebook,
  Instagram,
  ArrowRight,
  Check,
} from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeProvider } from "./theme-context"
import { ThemeToggle } from "./theme-toggle"
import { Notification } from "./notification"
import "@/app/animations.css"
import "@/app/form-styles.css"
import { ServiceCard } from "./service-card"
import { BookingForm } from "./booking-form"
import { WhyChooseUs } from "./why-choose-us"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
// 1. Comment out the import for PriceCalculatorSection
// import { PriceCalculatorSection } from "./price-calculator-section" // Commented out: Calculator de Preț section disabled
import { ContactSection } from "./contact-section"
import { FloatingSocialButtons } from "./floating-social-buttons"
import { SteamCleaningSection } from "./steam-cleaning-section"

// Define placeholder images
const logoImage = "/logo.png"
const backgroundImage = "/car-cleaning.jpeg"

interface Service {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
}

interface Testimonial {
  name: string
  role: string
  content: string
  image: string
}

interface NotificationState {
  show: boolean
  title: string
  message: string
  variant: "success" | "error" | "warning" | "info"
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    title: "",
    message: "",
    variant: "success",
  })

  // Animation controls
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Update the services array with improved detailing auto service and other refinements
  const services: Service[] = [
    {
      title: "Detailing Auto Premium",
      description: "Servicii complete de curățare și întreținere pentru interiorul și exteriorul mașinii dumneavoastră",
      features: [
        "Curățare interior profundă",
        "Aspirare și curățare tapițerie",
        "Dezinfectare și împrospătare",
        "Curățare și protecție bord și plastic",
      ],
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Curățare Covoare & Tapițerie",
      description: "Servicii profesionale de curățare pentru toate tipurile de covoare și tapițerii",
      features: [
        "Curățare profundă cu abur",
        "Îndepărtare pete dificile",
        "Dezinfectare și împrospătare",
        "Tratamente anti-acarieni",
      ],
      icon: <Broom className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Igienizare & Dezinfectare",
      description: "Servicii complete de igienizare și dezinfectare pentru spații comerciale și rezidențiale",
      features: [
        "Dezinfectare profesională",
        "Eliminare bacterii și viruși",
        "Tratamente anti-mucegai",
        "Certificate de igienizare",
      ],
      icon: <Shield className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Curățare Mobilier & Suprafețe",
      description: "Îngrijire specializată pentru mobilierul și suprafețele delicate din casa dumneavoastră",
      features: [
        "Curățare mobilier tapițat",
        "Tratamente pentru piele",
        "Curățare și protejare marmură",
        "Lustruire suprafețe delicate",
      ],
      icon: <Star className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Servicii la Domiciliu",
      description: "Tu te relaxezi, noi ne ocupăm de curățenie! Servicii complete de întreținere pentru casa ta",
      features: ["Programare flexibilă", "Personal calificat", "Produse premium", "Satisfacție garantată"],
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
  ]

  const testimonials: Testimonial[] = [
    {
      name: "Maria Popescu",
      role: "Client Rezidențial",
      content:
        "Servicii excelente! Echipa EliezerCleaning a făcut o treabă extraordinară cu curățenia casei mele. Sunt foarte mulțumită de profesionalismul și atenția la detalii.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      name: "Ioan Munteanu",
      role: "Proprietar Auto",
      content:
        "Detailing-ul auto oferit de EliezerCleaning este la superlativ. Mașina mea arată ca nouă după fiecare vizită. Recomand cu încredere!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    },
    {
      name: "Elena Dumitrescu",
      role: "Manager Restaurant",
      content:
        "Colaborăm de peste un an cu EliezerCleaning pentru curățenia restaurantului nostru. Servicii impecabile și personal foarte profesionist.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    },
  ]

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    setIsMenuOpen(false)
    const element = document.getElementById(section)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSuccessNotification = (message: string) => {
    setNotification({
      show: true,
      title: "Succes!",
      message,
      variant: "success",
    })
  }

  const handleErrorNotification = (message: string) => {
    setNotification({
      show: true,
      title: "Eroare",
      message,
      variant: "error",
    })
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-200">
        {notification.show && (
          <Notification
            title={notification.title}
            message={notification.message}
            variant={notification.variant}
            onClose={() => setNotification({ ...notification, show: false })}
          />
        )}

        <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md z-40 transition-colors duration-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-[200px] h-[80px] relative">
                  <img
                    src={logoImage || "/placeholder.svg"}
                    alt="EliezerCleaning Logo"
                    className="absolute top-0 left-0 w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                  className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <button
                      onClick={() => handleNavClick("home")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "home" ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}
                    >
                      Acasă
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("services")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "services" ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}
                    >
                      Servicii
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("testimonials")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "testimonials" ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}
                    >
                      Testimoniale
                    </button>
                  </li>
                  {/* Calculator de Preț navigation item - disabled
                  <li>
                    <button
                      onClick={() => handleNavClick("calculator")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "calculator" ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}
                    >
                      Calculator Preț
                    </button>
                  </li>
                  */}
                  <li>
                    <button
                      onClick={() => handleNavClick("booking")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "booking" ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}
                    >
                      Rezervare
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("contact")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "contact" ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg py-4 transition-colors duration-200 z-50">
                <ul className="flex flex-col space-y-4 px-4">
                  <li>
                    <button
                      onClick={() => handleNavClick("home")}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Acasă
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("services")}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Servicii
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("testimonials")}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Testimoniale
                    </button>
                  </li>
                  {/* Calculator de Preț mobile navigation item - disabled
                  <li>
                    <button
                      onClick={() => handleNavClick("calculator")}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Calculator Preț
                    </button>
                  </li>
                  */}
                  <li>
                    <button
                      onClick={() => handleNavClick("booking")}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Rezervare
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("contact")}
                      className="w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Enhanced Hero Section */}
        <section
          id="home"
          className="pt-32 pb-16 md:pt-36 md:pb-24 bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-800 dark:to-blue-900 overflow-hidden relative"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Content Column - Takes 7 columns on large screens */}
              <motion.div
                className="lg:col-span-7 space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-800/40 backdrop-blur-sm rounded-full border border-blue-700/50">
                    <span className="flex h-2 w-2 relative mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-blue-200 text-sm font-medium">Servicii Premium de Curățenie</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Transformăm <span className="text-blue-300">spațiile</span> în locuri{" "}
                    <span className="text-blue-300">impecabile</span>
                  </h1>

                  <p className="text-xl text-gray-100 dark:text-gray-300 max-w-2xl">
                    Servicii de curățenie de înaltă calitate pentru case și apartamente în Satu Mare și împrejurimi.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Echipă profesionistă și de încredere",
                    "Produse și echipamente premium",
                    "Satisfacție 100% garantată",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/30 flex items-center justify-center">
                        <Check className="h-4 w-4 text-blue-300" />
                      </div>
                      <p className="text-gray-100">{feature}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick("booking")}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 transition duration-150 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl"
                  >
                    Rezervă Acum
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick("services")}
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition duration-150 dark:border-gray-300 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Vezi Serviciile
                  </motion.button>
                </div>
              </motion.div>

              {/* Image Column - Takes 5 columns on large screens */}
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent z-10"></div>
                  <img
                    src="/car-cleaning.jpeg"
                    alt="EliezerCleaning car detailing service"
                    className="w-full h-full object-cover"
                  />

                  {/* Floating stats card */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 z-20 border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">500+</p>
                        <p className="text-xs text-blue-200">Clienți Mulțumiți</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">5★</p>
                        <p className="text-xs text-blue-200">Rating Mediu</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">100%</p>
                        <p className="text-xs text-blue-200">Satisfacție</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                className="dark:fill-gray-800"
              ></path>
            </svg>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Clock className="h-14 w-14 text-blue-600 dark:text-blue-400" />,
                  title: "Program Flexibil",
                  description: "Programări flexibile adaptate nevoilor dumneavoastră",
                },
                {
                  icon: <Award className="h-14 w-14 text-blue-600 dark:text-blue-400" />,
                  title: "Calitate Garantată",
                  description: "Servicii profesionale cu rezultate garantate",
                },
                {
                  icon: <MapPin className="h-14 w-14 text-blue-600 dark:text-blue-400" />,
                  title: "Acoperire Satu Mare",
                  description: "Servicii în Satu Mare și zonele limitrofe",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800/50 rounded-xl shadow-lg transition-all duration-300"
                >
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Serviciile Noastre</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Soluții profesionale pentru toate nevoile dumneavoastră de curățenie
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    icon={service.icon}
                    recommended={index === 0}
                    onBookNow={() => handleNavClick("booking")}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Ce Spun Clienții Noștri</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Experiențe reale ale clienților care au ales serviciile noastre
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="booking"
          className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Rezervă Serviciul de Curățenie</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Completați formularul de mai jos pentru a programa un serviciu de curățenie profesional sau sunați-ne
                pentru asistență imediată
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BookingForm
                  services={services}
                  onSubmitSuccess={handleSuccessNotification}
                  onSubmitError={handleErrorNotification}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                <WhyChooseUs />
              </motion.div>
            </div>
          </div>
        </section>

        <SteamCleaningSection />
        <ContactSection />

        <footer className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-gray-950 dark:to-gray-900 text-white transition-colors duration-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="w-[200px] h-[80px] relative mb-4">
                  <img
                    src={logoImage || "/placeholder.svg"}
                    alt="EliezerCleaning Logo"
                    className="absolute top-0 left-0 w-full h-full object-contain"
                  />
                </div>
                <p className="text-gray-300 text-lg">
                  Servicii profesionale de curățenie pentru casa ta în Satu Mare și împrejurimi
                </p>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-white">Program de Lucru</h4>
                  <p className="text-gray-300">Luni - Vineri: 08:00 - 20:00</p>
                  <p className="text-gray-300">Sâmbătă: 09:00 - 18:00</p>
                  <p className="text-gray-300">Duminică: Închis</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Contact Rapid</h3>
                <div className="space-y-4">
                  <p className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <a href="tel:+40755322752" className="text-gray-300 hover:text-blue-400 transition-colors">
                      +40 755 322 752
                    </a>
                  </p>
                  <p className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">Satu Mare, România</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <Facebook className="h-5 w-5 text-blue-400" />
                    <a
                      href="https://www.facebook.com/profile.php?id=61565136025145"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Facebook
                    </a>
                  </p>
                  <p className="flex items-center space-x-3">
                    <Instagram className="h-5 w-5 text-blue-400" />
                    <a
                      href="https://www.instagram.com/eliezer.cleaning/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Instagram
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Servicii Principale</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleNavClick("services")}
                        className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {service.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} EliezerCleaning. Toate drepturile rezervate.
              </p>
            </div>
          </div>
        </footer>
        <FloatingSocialButtons />
      </div>
    </ThemeProvider>
  )
}
