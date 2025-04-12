"use client"

import type React from "react"

import {
  Sparkles,
  Clock,
  Calendar,
  MapPin,
  CheckCircle,
  Phone,
  BrushIcon as Broom,
  Star,
  Send,
  Menu,
  X,
  Award,
  Shield,
  Users,
  User,
  MessageSquare,
} from "lucide-react"
import emailjs from "@emailjs/browser"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { ThemeProvider } from "./theme-context"
import { ThemeToggle } from "./theme-toggle"
import { SuccessNotification } from "./success-notification"
import "./animations.css"
import "./form-styles.css"

interface Service {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
}

interface BookingFormData {
  service: string
  date: string
  time: string
  name: string
  phone: string
  address: string
  notes: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  image: string
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const bookingFormRef = useRef<HTMLFormElement>(null)
  const contactFormRef = useRef<HTMLFormElement>(null)

  const [bookingData, setBookingData] = useState<BookingFormData>({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    address: "",
    notes: "",
  })

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  })

  const services: Service[] = [
    {
      title: "Detailing Auto Premium",
      description: "Servicii complete de curățare și întreținere pentru interiorul și exteriorul mașinii dumneavoastră",
      features: [
        "Curățare interior profundă",
        "Polish și ceruire exterior",
        "Tratamente specializate pentru piele",
        "Decontaminare și protecție ceramică",
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await emailjs.sendForm(
        "service_m3w0ype", // Replace with your EmailJS service ID
        "template_lpflh8e", // Replace with your EmailJS template ID
        bookingFormRef.current!,
        "dwErPR86QGQa-LJhj", // Replace with your EmailJS public key
      )

      setNotification({
        show: true,
        message: "Rezervarea dumneavoastră a fost trimisă cu succes! Vă vom contacta în curând pentru confirmare.",
      })

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, message: "" })
      }, 5000)

      setBookingData({
        service: "",
        date: "",
        time: "",
        name: "",
        phone: "",
        address: "",
        notes: "",
      })
    } catch (error) {
      toast.error("A apărut o eroare. Vă rugăm încercați din nou.")
      console.error("EmailJS Error:", error)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await emailjs.sendForm(
        "service_your_service_id", // Replace with your EmailJS service ID
        "template_your_template_id", // Replace with your EmailJS template ID
        contactFormRef.current!,
        "your_public_key", // Replace with your EmailJS public key
      )

      setNotification({
        show: true,
        message: "Mesajul dumneavoastră a fost trimis cu succes! Vă mulțumim pentru contactare.",
      })

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, message: "" })
      }, 5000)

      setContactForm({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      toast.error("A apărut o eroare. Vă rugăm încercați din nou.")
      console.error("EmailJS Error:", error)
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-200">
        {notification.show && (
          <SuccessNotification
            message={notification.message}
            onClose={() => setNotification({ show: false, message: "" })}
          />
        )}

        <header className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-40 transition-colors duration-200">
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
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <button
                      onClick={() => handleNavClick("home")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "home" ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      Acasă
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("services")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "services" ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      Servicii
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("testimonials")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "testimonials" ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      Testimoniale
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("booking")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "booking" ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      Rezervare
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick("contact")}
                      className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${activeSection === "contact" ? "text-blue-600 dark:text-blue-400" : ""}`}
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 transition-colors duration-200">
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

        <section
          id="home"
          className="pt-32 bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-800 dark:to-blue-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 items-center">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl dark:text-white">
                  Servicii Premium de Curățenie
                </h1>
                <p className="mt-6 text-xl text-gray-100 dark:text-gray-300">
                  Transformăm spațiile în locuri impecabile cu servicii de curățenie de înaltă calitate pentru case și
                  apartamente în Satu Mare și împrejurimi.
                </p>
                <div className="mt-10 flex space-x-4">
                  <button
                    onClick={() => handleNavClick("booking")}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 transition duration-150 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Rezervă Acum
                  </button>
                  <button
                    onClick={() => handleNavClick("services")}
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition duration-150 dark:border-gray-300 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Vezi Serviciile
                  </button>
                </div>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src={backgroundImage || "/placeholder.svg"}
                  alt="Interior casă curată"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Clock className="h-14 w-14 text-blue-600 dark:text-blue-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Program Flexibil</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Programări flexibile adaptate nevoilor dumneavoastră
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Award className="h-14 w-14 text-blue-600 dark:text-blue-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Calitate Garantată</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Servicii profesionale cu rezultate garantate
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <MapPin className="h-14 w-14 text-blue-600 dark:text-blue-400" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Acoperire Satu Mare</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Servicii în Satu Mare și zonele limitrofe
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
              Serviciile Noastre
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
              Soluții profesionale pentru toate nevoile dumneavoastră de curățenie
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      {service.icon}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-4">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleNavClick("booking")}
                      className="mt-8 w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-150 font-medium"
                    >
                      Rezervă Acum
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
              Ce Spun Clienții Noștri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
              Experiențe reale ale clienților care au ales serviciile noastre
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="booking"
          className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Rezervă Serviciul de Curățenie</h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Completați formularul de mai jos pentru a programa un serviciu de curățenie profesional sau sunați-ne
                pentru asistență imediată
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Formular de Rezervare</h3>
                </div>

                <form ref={bookingFormRef} onSubmit={handleBookingSubmit} className="space-y-6">
                  <input type="hidden" name="to_email" value="eliezer.cleaning.sm@gmail.com" />

                  <div className="input-icon-container">
                    <Star className="w-5 h-5 input-icon" />
                    <select
                      id="service"
                      name="service"
                      value={bookingData.service}
                      onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Selectează serviciul dorit</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="input-icon-container">
                      <Calendar className="w-5 h-5 input-icon" />
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div className="input-icon-container">
                      <Clock className="w-5 h-5 input-icon" />
                      <input
                        type="time"
                        name="time"
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="input-icon-container">
                    <User className="w-5 h-5 input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Numele și prenumele"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="input-icon-container">
                    <Phone className="w-5 h-5 input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Număr de telefon"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="input-icon-container">
                    <MapPin className="w-5 h-5 input-icon" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Adresa completă"
                      value={bookingData.address}
                      onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="input-icon-container">
                    <MessageSquare className="w-5 h-5 input-icon" />
                    <textarea
                      name="notes"
                      placeholder="Observații sau cerințe speciale"
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Programează Serviciul</span>
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl booking-card">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">De ce să ne alegi?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Shield className="w-6 h-6" />, text: "Servicii garantate și asigurate" },
                      { icon: <Clock className="w-6 h-6" />, text: "Program flexibil, 7 zile din 7" },
                      { icon: <Award className="w-6 h-6" />, text: "Personal calificat și verificat" },
                      { icon: <Sparkles className="w-6 h-6" />, text: "Echipamente și produse premium" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="text-blue-600 dark:text-blue-400">{item.icon}</div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl booking-card">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Rapid</h3>
                  <div className="space-y-4">
                    <a
                      href="tel:+40755322752"
                      className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">+40 755 322 752</span>
                    </a>
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Satu Mare, România</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Contactați-ne</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                Aveți întrebări? Suntem aici să vă ajutăm!
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form
                ref={contactFormRef}
                onSubmit={handleContactSubmit}
                className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="input-icon-container">
                  <User className="w-5 h-5 input-icon" />
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Numele dumneavoastră"
                    required
                  />
                </div>
                <div className="input-icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 input-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="email@exemplu.com"
                    required
                  />
                </div>
                <div className="input-icon-container">
                  <MessageSquare className="w-5 h-5 input-icon" />
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 form-input-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                    placeholder="Scrieți mesajul dumneavoastră aici..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Trimite Mesaj</span>
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Vă vom răspunde în cel mai scurt timp posibil
                </p>
              </form>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-200">
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
                <p className="text-gray-400 text-lg">
                  Servicii profesionale de curățenie pentru casa ta în Satu Mare și împrejurimi
                </p>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Program de Lucru</h4>
                  <p className="text-gray-400">Luni - Vineri: 08:00 - 20:00</p>
                  <p className="text-gray-400">Sâmbătă: 09:00 - 18:00</p>
                  <p className="text-gray-400">Duminică: Închis</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Rapid</h3>
                <div className="space-y-4">
                  <p className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <a href="tel:+40755322752" className="hover:text-blue-400">
                      +40 755 322 752
                    </a>
                  </p>
                  <p className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span>Satu Mare, România</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Servicii Principale</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <button onClick={() => handleNavClick("services")} className="text-gray-400 hover:text-blue-400">
                        {service.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-400">&copy; 2024 EliezerCleaning. Toate drepturile rezervate.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
