"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Home, Car, Sofa, ArrowRight, ArrowLeft, Check, Sparkles, Calculator } from "lucide-react"

interface SmartBookingWizardProps {
  onComplete: (data: BookingData) => void
}

interface BookingData {
  serviceType: string
  spaceType: string
  size: number
  extras: string[]
  date: string
  time: string
  address: string
  notes: string
  estimatedPrice: number
  estimatedDuration: string
}

export function SmartBookingWizard({ onComplete }: SmartBookingWizardProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<BookingData>({
    serviceType: "",
    spaceType: "",
    size: 50,
    extras: [],
    date: "",
    time: "",
    address: "",
    notes: "",
    estimatedPrice: 0,
    estimatedDuration: "",
  })

  const updateData = (field: keyof BookingData, value: any) => {
    setData((prev) => {
      const newData = { ...prev, [field]: value }

      // Calculate estimated price and duration based on selections
      let basePrice = 0
      let baseDuration = ""

      // Base price by service type
      switch (newData.serviceType) {
        case "home":
          basePrice = newData.size * 2.5
          baseDuration = newData.size < 70 ? "2-3 ore" : "3-5 ore"
          break
        case "car":
          basePrice = 150
          baseDuration = "1-2 ore"
          break
        case "office":
          basePrice = newData.size * 2
          baseDuration = "3-4 ore"
          break
        default:
          basePrice = 0
          baseDuration = ""
      }

      // Add extras
      const extrasPrice = newData.extras.length * 50

      newData.estimatedPrice = basePrice + extrasPrice
      newData.estimatedDuration = baseDuration

      return newData
    })
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleComplete = () => {
    onComplete(data)
  }

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <Card className="w-full shadow-xl border-blue-100 dark:border-blue-900/30">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Calculator Inteligent de Preț
        </CardTitle>
        <CardDescription>
          Estimați rapid costul serviciului de curățenie în funcție de nevoile dumneavoastră
        </CardDescription>

        {/* Progress indicator */}
        <div className="w-full mt-4">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  step >= i ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Ce tip de serviciu doriți?</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "home", icon: <Home className="h-6 w-6" />, label: "Curățenie Casă/Apartament" },
                  { id: "car", icon: <Car className="h-6 w-6" />, label: "Detailing Auto" },
                  { id: "office", icon: <Sofa className="h-6 w-6" />, label: "Curățenie Birou/Spațiu Comercial" },
                ].map((service) => (
                  <div
                    key={service.id}
                    onClick={() => updateData("serviceType", service.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      data.serviceType === service.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div
                        className={`p-3 rounded-full ${
                          data.serviceType === service.id
                            ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <span className="font-medium">{service.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {data.serviceType && (
                <>
                  <div className="space-y-4 pt-4">
                    <h4 className="font-medium">Dimensiune aproximativă</h4>
                    {data.serviceType === "car" ? (
                      <div className="space-y-2">
                        <Select onValueChange={(v) => updateData("spaceType", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selectați tipul mașinii" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Mașină mică (ex. Dacia Logan)</SelectItem>
                            <SelectItem value="medium">Mașină medie (ex. Volkswagen Golf)</SelectItem>
                            <SelectItem value="large">Mașină mare (ex. SUV, Van)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Slider
                          value={[data.size]}
                          min={20}
                          max={200}
                          step={10}
                          onValueChange={(v) => updateData("size", v[0])}
                        />
                        <div className="flex justify-between text-sm">
                          <span>20 m²</span>
                          <span className="font-medium">{data.size} m²</span>
                          <span>200 m²</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="font-medium">Servicii extra</h4>
                    <div className="space-y-3">
                      {data.serviceType === "car" ? (
                        <>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="polish">Polish și ceruire</Label>
                            <Switch
                              id="polish"
                              checked={data.extras.includes("polish")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateData("extras", [...data.extras, "polish"])
                                } else {
                                  updateData(
                                    "extras",
                                    data.extras.filter((e) => e !== "polish"),
                                  )
                                }
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="leather">Tratament piele</Label>
                            <Switch
                              id="leather"
                              checked={data.extras.includes("leather")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateData("extras", [...data.extras, "leather"])
                                } else {
                                  updateData(
                                    "extras",
                                    data.extras.filter((e) => e !== "leather"),
                                  )
                                }
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="windows">Curățare geamuri</Label>
                            <Switch
                              id="windows"
                              checked={data.extras.includes("windows")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateData("extras", [...data.extras, "windows"])
                                } else {
                                  updateData(
                                    "extras",
                                    data.extras.filter((e) => e !== "windows"),
                                  )
                                }
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="deep">Curățare profundă</Label>
                            <Switch
                              id="deep"
                              checked={data.extras.includes("deep")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateData("extras", [...data.extras, "deep"])
                                } else {
                                  updateData(
                                    "extras",
                                    data.extras.filter((e) => e !== "deep"),
                                  )
                                }
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Când doriți serviciul?</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={data.date}
                      onChange={(e) => updateData("date", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Ora</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="time"
                      type="time"
                      className="pl-10"
                      value={data.time}
                      onChange={(e) => updateData("time", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {data.date && data.time && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    Estimare Preț și Durată
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Preț estimat:</span>
                      <span className="font-bold text-lg">{data.estimatedPrice} RON</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Durată estimată:</span>
                      <span className="font-medium">{data.estimatedDuration}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                      *Prețul final poate varia în funcție de condițiile specifice
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Detalii adresă</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Adresa completă</Label>
                  <Textarea
                    id="address"
                    placeholder="Strada, număr, bloc, apartament, oraș"
                    value={data.address}
                    onChange={(e) => updateData("address", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observații (opțional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Detalii suplimentare, instrucțiuni speciale, etc."
                    value={data.notes}
                    onChange={(e) => updateData("notes", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Rezumat comandă</h3>

              <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Serviciu:</span>
                    <span className="font-medium">
                      {data.serviceType === "home" && "Curățenie Casă/Apartament"}
                      {data.serviceType === "car" && "Detailing Auto"}
                      {data.serviceType === "office" && "Curățenie Birou/Spațiu Comercial"}
                    </span>
                  </div>

                  {data.serviceType !== "car" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Dimensiune:</span>
                      <span className="font-medium">{data.size} m²</span>
                    </div>
                  )}

                  {data.serviceType === "car" && data.spaceType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tip mașină:</span>
                      <span className="font-medium">
                        {data.spaceType === "small" && "Mașină mică"}
                        {data.spaceType === "medium" && "Mașină medie"}
                        {data.spaceType === "large" && "Mașină mare"}
                      </span>
                    </div>
                  )}

                  {data.extras.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Servicii extra:</span>
                      <span className="font-medium text-right">
                        {data.extras.map((extra) => (
                          <div key={extra}>
                            {extra === "polish" && "Polish și ceruire"}
                            {extra === "leather" && "Tratament piele"}
                            {extra === "windows" && "Curățare geamuri"}
                            {extra === "deep" && "Curățare profundă"}
                          </div>
                        ))}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Data și ora:</span>
                    <span className="font-medium">
                      {data.date} la {data.time}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Adresa:</span>
                    <span className="font-medium text-right">{data.address}</span>
                  </div>

                  {data.notes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Observații:</span>
                      <span className="font-medium text-right">{data.notes}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-blue-200 dark:border-blue-800 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Preț total estimat:</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {data.estimatedPrice} RON
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                    *Prețul final poate varia în funcție de condițiile specifice
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Înapoi
          </Button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
            disabled={
              (step === 1 && !data.serviceType) ||
              (step === 2 && (!data.date || !data.time)) ||
              (step === 3 && !data.address)
            }
          >
            Continuă
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
          >
            <Check className="mr-2 h-4 w-4" />
            Finalizează Comanda
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
