"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ServiceDetailProps {
  title: string
  description: string
  icon: React.ReactNode
  initiallyOpen?: boolean
}

const ServiceDetail = ({ title, description, icon, initiallyOpen = false }: ServiceDetailProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen)

  return (
    <Card className="overflow-hidden border-blue-100 dark:border-blue-900/30 shadow-md hover:shadow-lg transition-all duration-300">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/40 dark:to-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">{icon}</div>
          <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{title}</h4>
        </div>
        <div className="text-blue-600 dark:text-blue-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-white dark:bg-gray-800"
        >
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </motion.div>
      )}
    </Card>
  )
}

export function SteamCleaningSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState("residential")

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="steam-cleaning" className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 z-0"></div>
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231e40af' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Steam effect (decorative) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white dark:bg-blue-200 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">Serviciu Premium</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">Curățenie cu Aburi</h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ✨ Curățenie impecabilă cu puterea aburului! ✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
              Vrei o soluție eficientă și ecologică pentru curățenia ta? Noi îți oferim servicii profesionale de
              curățenie cu aburi, eliminând murdăria, bacteriile și mirosurile neplăcute – fără chimicale agresive!
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Curățare și dezinfectare rapidă
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Procesul nostru elimină 99.9% din bacterii și germeni
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Soluție eco-friendly</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sigură pentru copii, animale și mediul înconjurător
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Rezultate impecabile</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Pentru mobilier, covoare, tapițerii, băi, bucătării și multe altele
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/steam-cleaning.jpg"
                alt="Curățenie profesională cu aburi pentru canapele"
                className="object-cover w-full h-full rounded-2xl transform transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Curățare cu Aburi</h3>
                <p className="text-white/90">Revitalizăm mobilierul și tapițeriile</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hidden md:block">
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Satisfacție</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-6 py-4 text-lg font-medium transition-colors duration-300 ${
                  activeTab === "residential"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setActiveTab("residential")}
              >
                Rezidențial
              </button>
              <button
                className={`px-6 py-4 text-lg font-medium transition-colors duration-300 ${
                  activeTab === "commercial"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setActiveTab("commercial")}
              >
                Comercial
              </button>
              <button
                className={`px-6 py-4 text-lg font-medium transition-colors duration-300 ${
                  activeTab === "auto"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setActiveTab("auto")}
              >
                Auto
              </button>
            </div>

            <div className="p-6">
              {activeTab === "residential" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Curățenie cu Aburi pentru Locuințe
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Transformăm locuința dumneavoastră cu ajutorul tehnologiei moderne de curățare cu aburi. Eliminăm
                    murdăria, alergenii și bacteriile din toate spațiile casei.
                  </p>
                  <div className="space-y-4">
                    <ServiceDetail
                      title="Curățare Canapele și Fotolii"
                      description="Îndepărtăm petele, mirosurile și alergenii din tapițerie, lăsând materialele proaspete și igienizate. Aburul pătrunde în profunzime, eliminând murdăria invizibilă."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      initiallyOpen={true}
                    />
                    <ServiceDetail
                      title="Curățare Covoare și Mochete"
                      description="Revitalizăm covoarele și mochetele, îndepărtând petele dificile, mirosurile și alergenii acumulați în fibre, fără a utiliza substanțe chimice agresive."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    />
                    <ServiceDetail
                      title="Curățare Băi și Bucătării"
                      description="Dezinfectăm și curățăm suprafețele din băi și bucătării, eliminând depunerile de calcar, grăsimea și bacteriile, lăsând spațiile impecabile și igienizate."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "commercial" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Curățenie cu Aburi pentru Spații Comerciale
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Oferim soluții profesionale de curățenie cu aburi pentru birouri, restaurante, hoteluri și alte
                    spații comerciale, asigurând un mediu curat și sănătos.
                  </p>
                  <div className="space-y-4">
                    <ServiceDetail
                      title="Curățare Birouri și Săli de Conferințe"
                      description="Igienizăm scaunele, fotoliile, mochetele și alte suprafețe din birouri, creând un mediu de lucru curat și sănătos pentru angajați și clienți."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      initiallyOpen={true}
                    />
                    <ServiceDetail
                      title="Curățare Restaurante și Hoteluri"
                      description="Dezinfectăm și curățăm tapițeriile, mochetele și suprafețele din restaurante și hoteluri, eliminând mirosurile și asigurând un mediu igienizat pentru clienți."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    />
                    <ServiceDetail
                      title="Curățare Spații Publice"
                      description="Oferim servicii de curățenie cu aburi pentru diverse spații publice, asigurând eliminarea germenilor și bacteriilor de pe suprafețele frecvent atinse."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "auto" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Curățenie cu Aburi pentru Automobile
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Revitalizăm interiorul mașinii dumneavoastră cu ajutorul tehnologiei de curățare cu aburi, eliminând
                    murdăria, bacteriile și mirosurile neplăcute.
                  </p>
                  <div className="space-y-4">
                    <ServiceDetail
                      title="Curățare Tapițerie Auto"
                      description="Îndepărtăm petele, mirosurile și alergenii din tapițeria mașinii, lăsând materialele proaspete și igienizate, fără a le deteriora."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      initiallyOpen={true}
                    />
                    <ServiceDetail
                      title="Curățare Bord și Console"
                      description="Curățăm și dezinfectăm bordul, consola centrală și alte suprafețe din interiorul mașinii, eliminând praful și bacteriile acumulate."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    />
                    <ServiceDetail
                      title="Dezinfectare Completă"
                      description="Oferim servicii de dezinfectare completă a interiorului mașinii, eliminând bacteriile și virușii de pe toate suprafețele, inclusiv cele greu accesibile."
                      icon={<CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                const bookingSection = document.getElementById("booking")
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: "smooth" })
                  // Add a small delay to focus on the service dropdown and select steam cleaning
                  setTimeout(() => {
                    const serviceDropdown = document.querySelector('[name="service"]') as HTMLSelectElement
                    if (serviceDropdown) {
                      // Try to select the steam cleaning service if it exists
                      const steamOption = Array.from(serviceDropdown.options).find(
                        (option) =>
                          option.text.toLowerCase().includes("aburi") ||
                          option.text.toLowerCase().includes("curățare covoare"),
                      )
                      if (steamOption) {
                        serviceDropdown.value = steamOption.value
                        // Trigger change event
                        const event = new Event("change", { bubbles: true })
                        serviceDropdown.dispatchEvent(event)
                      }
                    }
                  }, 800)
                }
              }}
            >
              <span>Solicită o ofertă pentru curățenie cu aburi</span>
              <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Răspundem cu o ofertă personalizată</p>
        </motion.div>
      </div>
    </section>
  )
}
