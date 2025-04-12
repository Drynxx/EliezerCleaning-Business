"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Star,
  CheckCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Home,
} from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ro } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"

interface Service {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
}

const serviceFormSchema = z.object({
  service: z.string().min(1, { message: "Vă rugăm selectați un serviciu" }),
})

const dateTimeFormSchema = z.object({
  date: z.date({ required_error: "Vă rugăm selectați o dată" }),
  time: z.string().min(1, { message: "Vă rugăm selectați o oră" }),
})

const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Numele trebuie să conțină cel puțin 3 caractere" }),
  phone: z
    .string()
    .min(10, { message: "Numărul de telefon trebuie să conțină cel puțin 10 caractere" })
    .regex(/^[0-9+\s()-]+$/, { message: "Numărul de telefon poate conține doar cifre și simboluri: +()-" }),
  address: z.string().min(5, { message: "Adresa trebuie să conțină cel puțin 5 caractere" }),
  notes: z.string().optional(),
})

const formSchema = serviceFormSchema.merge(dateTimeFormSchema).merge(contactFormSchema)

type BookingFormValues = z.infer<typeof formSchema>

interface BookingFormProps {
  services: Service[]
  onSubmitSuccess: (message: string) => void
  onSubmitError: (message: string) => void
}

export function BookingForm({ services, onSubmitSuccess, onSubmitError }: BookingFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      name: "",
      phone: "",
      address: "",
      notes: "",
    },
    mode: "onChange",
  })

  const watchService = form.watch("service")
  const watchDate = form.watch("date")
  const watchTime = form.watch("time")

  const canProceedToStep2 = form.getFieldState("service").isDirty && !form.getFieldState("service").invalid
  const canProceedToStep3 =
    form.getFieldState("date").isDirty &&
    !form.getFieldState("date").invalid &&
    form.getFieldState("time").isDirty &&
    !form.getFieldState("time").invalid

  const selectedService = services.find((service) => service.title === watchService)

  async function onSubmit(values: BookingFormValues) {
    setIsSubmitting(true)

    try {
      // Prepare form data for EmailJS
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === "date" && value instanceof Date) {
          formData.append(key, format(value, "PPP", { locale: ro }))
        } else {
          formData.append(key, value as string)
        }
      })

      // Add any additional fields needed for the template
      formData.append("to_email", "eliezer.cleaning.sm@gmail.com")

      // Create a form element to send with EmailJS
      const form = document.createElement("form")
      formData.forEach((value, key) => {
        const input = document.createElement("input")
        input.name = key
        input.value = value as string
        form.appendChild(input)
      })

      // Send the form using EmailJS
      await emailjs.sendForm("service_m3w0ype", "template_lpflh8e", form, "dwErPR86QGQa-LJhj")

      // Format the success message with booking details
      const formattedDate = format(values.date, "PPP", { locale: ro })
      const successMessage = `Rezervarea pentru ${values.service} în data de ${formattedDate} la ora ${values.time} a fost trimisă cu succes! Vă vom contacta în curând pentru confirmare.`

      // Reset form
      form.reset()
      setStep(1)

      // Show success notification
      onSubmitSuccess(successMessage)
    } catch (error) {
      console.error("Error submitting form:", error)
      onSubmitError(
        "A apărut o eroare la trimiterea rezervării. Vă rugăm să încercați din nou sau să ne contactați telefonic.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && canProceedToStep2) setStep(2)
    else if (step === 2 && canProceedToStep3) setStep(3)
  }

  const prevStep = () => {
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <Card className="border-blue-100 dark:border-blue-900/30 shadow-xl overflow-hidden">
      <CardHeader className="space-y-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Formular de Rezervare</CardTitle>
        </div>
        <CardDescription>Completați formularul pentru a programa un serviciu de curățenie profesional</CardDescription>

        {/* Progress bar */}
        <div className="w-full mt-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Serviciu</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Data & Ora</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium">Contact</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-2 transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serviciu</FormLabel>
                          <div className="relative">
                            <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500">
                                  <SelectValue placeholder="Selectează serviciul dorit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((service, index) => (
                                  <SelectItem key={index} value={service.title}>
                                    {service.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedService && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20 animate-fade-in">
                        <h4 className="font-medium text-lg mb-2 flex items-center">
                          {selectedService.icon}
                          <span className="ml-2">{selectedService.title}</span>
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{selectedService.description}</p>
                        <div className="space-y-1">
                          {selectedService.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-10 text-left font-normal border-blue-100 dark:border-blue-900/30 focus:ring-blue-500",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: ro })
                                  ) : (
                                    <span>Selectați data</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0)) || date.getDay() === 0
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ora</FormLabel>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <FormControl>
                              <Input
                                type="time"
                                placeholder="Selectează ora"
                                className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchDate && watchTime && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20 animate-fade-in">
                        <h4 className="font-medium text-lg mb-2 flex items-center">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                          Detalii Programare
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">
                              Serviciu: <span className="font-medium">{watchService}</span>
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">
                              Data: <span className="font-medium">{format(watchDate, "PPP", { locale: ro })}</span>
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">
                              Ora: <span className="font-medium">{watchTime}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                >
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nume și prenume</FormLabel>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <FormControl>
                              <Input
                                placeholder="Numele și prenumele dumneavoastră"
                                className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <FormControl>
                              <Input
                                placeholder="Numărul dumneavoastră de telefon"
                                className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresa</FormLabel>
                          <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <FormControl>
                              <Input
                                placeholder="Adresa completă"
                                className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Observații (opțional)</FormLabel>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <FormControl>
                              <Textarea
                                placeholder="Observații sau cerințe speciale"
                                className="pl-10 min-h-[100px] border-blue-100 dark:border-blue-900/30 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                      <h4 className="font-medium text-lg mb-2">Rezumat Rezervare</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Serviciu: <span className="font-medium">{watchService}</span>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Data: <span className="font-medium">{format(watchDate, "PPP", { locale: ro })}</span>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Ora: <span className="font-medium">{watchTime}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
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

        {step < 3 ? (
          <Button
            onClick={nextStep}
            disabled={(step === 1 && !canProceedToStep2) || (step === 2 && !canProceedToStep3)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
          >
            Continuă
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting || !form.formState.isValid}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Finalizează Rezervarea
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
