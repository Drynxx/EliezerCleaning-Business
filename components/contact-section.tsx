"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import { Notification } from "./notification"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Send,
  User,
  MessageSquare,
  Loader2,
  CheckCircle,
} from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(3, { message: "Numele trebuie să conțină cel puțin 3 caractere" }),
  email: z.string().email({ message: "Adresa de email nu este validă" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Selectează un subiect" }),
  message: z.string().min(10, { message: "Mesajul trebuie să conțină cel puțin 10 caractere" }),
})

type ContactFormValues = z.infer<typeof formSchema>

const subjectOptions = [
  { value: "general", label: "Informații Generale" },
  { value: "booking", label: "Programare Servicii" },
  { value: "quote", label: "Solicitare Ofertă de Preț" },
  { value: "steam", label: "Curățenie cu Aburi" },
  { value: "auto", label: "Detailing Auto" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Altele" },
]

export function ContactSection() {
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true)

    try {
      // Find the label for the selected subject
      const subjectLabel = subjectOptions.find((option) => option.value === values.subject)?.label || values.subject

      // Prepare template parameters for EmailJS with correct field mappings
      const templateParams = {
        nume: values.name, // Map name to {{nume}} in template
        email: values.email, // Map email to {{email}} in template
        phonenumber: values.phone || "Nu a fost specificat", // Map phone to {{phonenumber}} in template
        title: subjectLabel, // Map subject to {{title}} for the template
        message: values.message,
        to_email: "eliezer.cleaning.sm@gmail.com",
      }

      // Send email using EmailJS with the specific template
      await emailjs.send("service_m3w0ype", "template_50nu0gt", templateParams, "dwErPR86QGQa-LJhj")

      // Reset form
      form.reset()
      setIsSubmitted(true)

      // Show success notification
      setNotification({
        show: true,
        title: "Succes!",
        message: `Mulțumim, ${values.name}! Mesajul dumneavoastră a fost trimis cu succes. Vă vom răspunde în cel mai scurt timp posibil.`,
        variant: "success",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setNotification({
        show: true,
        title: "Eroare",
        message:
          "A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou sau să ne contactați telefonic.",
        variant: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {notification.show && (
        <Notification
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231e40af' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-full">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">Contactați-ne</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Suntem aici pentru dumneavoastră
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aveți întrebări sau doriți să programați un serviciu? Suntem aici să vă ajutăm!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <AnimatePresence>
                {!isSubmitted ? (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Trimiteți-ne un mesaj</h3>

                    <Form {...form}>
                      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <input type="hidden" name="to_email" value="eliezer.cleaning.sm@gmail.com" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-white">Nume și prenume</FormLabel>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input
                                      placeholder="Numele și prenumele dumneavoastră"
                                      className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
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
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-white">Email</FormLabel>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input
                                      placeholder="Adresa dumneavoastră de email"
                                      className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                                      {...field}
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-white">Telefon (opțional)</FormLabel>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input
                                      placeholder="Numărul dumneavoastră de telefon"
                                      className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
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
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 dark:text-white">Subiect</FormLabel>
                                <div className="relative">
                                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="pl-10 border-blue-100 dark:border-blue-900/30 focus:ring-blue-500 text-gray-900 dark:text-white">
                                        <SelectValue placeholder="Selectați subiectul" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {subjectOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-white">Mesaj</FormLabel>
                              <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <FormControl>
                                  <Textarea
                                    placeholder="Scrieți mesajul dumneavoastră aici..."
                                    className="pl-10 min-h-[150px] border-blue-100 dark:border-blue-900/30 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md py-6 text-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Se procesează...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Trimite Mesaj
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6">
                      <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Mesaj trimis cu succes!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                      Vă mulțumim pentru mesaj. Echipa noastră vă va contacta în cel mai scurt timp posibil.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      Trimite un alt mesaj
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Informații de Contact</h3>
                <motion.div
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div className="flex items-start" variants={itemVariants}>
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Telefon</h4>
                      <a
                        href="tel:+40755322752"
                        className="text-blue-100 hover:text-white transition-colors flex items-center mt-1 group"
                      >
                        +40 755 322 752
                        <ExternalLink className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start" variants={itemVariants}>
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Email</h4>
                      <a
                        href="mailto:eliezer.cleaning.sm@gmail.com"
                        className="text-blue-100 hover:text-white transition-colors flex items-center mt-1 group"
                      >
                        eliezer.cleaning.sm@gmail.com
                        <ExternalLink className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start" variants={itemVariants}>
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Adresă</h4>
                      <p className="text-blue-100 mt-1">Satu Mare, România</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start" variants={itemVariants}>
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Program</h4>
                      <div className="text-blue-100 mt-1">
                        <p>Luni - Vineri: 08:00 - 20:00</p>
                        <p>Sâmbătă: 09:00 - 18:00</p>
                        <p>Duminică: Închis</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Urmărește-ne</h3>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a
                      href="https://www.facebook.com/profile.php?id=61565136025145"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/40 p-4 rounded-xl w-full transition-colors"
                    >
                      <div className="bg-blue-600 text-white p-3 rounded-full">
                        <Facebook className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Facebook</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Urmărește-ne pentru noutăți</p>
                      </div>
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a
                      href="https://www.instagram.com/eliezer.cleaning/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/40 p-4 rounded-xl w-full transition-colors"
                    >
                      <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-full">
                        <Instagram className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">Instagram</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Vezi rezultatele noastre</p>
                      </div>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Zonă de Acoperire</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Oferim servicii de curățenie în Satu Mare și împrejurimi, inclusiv localitățile din apropiere.
                </p>
                <div ref={mapRef} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43133.43868731486!2d22.85853!3d47.7892!2m3!1f0!2f3!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4737d92e8abe5c27%3A0x4aae8f16e7261b2!2sSatu%20Mare%2C%20Romania!5e0!3m2!1sen!2sus!4v1649927456781!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Harta Satu Mare"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
