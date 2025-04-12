"use client"

import { useState, useRef } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import { User, Mail, MessageSquare, Send, Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(3, { message: "Numele trebuie să conțină cel puțin 3 caractere" }),
  email: z.string().email({ message: "Adresa de email nu este validă" }),
  message: z.string().min(10, { message: "Mesajul trebuie să conțină cel puțin 10 caractere" }),
})

type ContactFormValues = z.infer<typeof formSchema>

interface ContactFormImprovedProps {
  onSubmitSuccess: (message: string) => void
  onSubmitError: (message: string) => void
}

export function ContactFormImproved({ onSubmitSuccess, onSubmitError }: ContactFormImprovedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true)

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
        to_email: "eliezer.cleaning.sm@gmail.com",
      }

      // Send email using EmailJS
      await emailjs.send("service_m3w0ype", "template_lpflh8e", templateParams, "dwErPR86QGQa-LJhj")

      // Reset form
      form.reset()

      // Show success notification
      onSubmitSuccess(
        `Mulțumim, ${values.name}! Mesajul dumneavoastră a fost trimis cu succes. Vă vom răspunde în cel mai scurt timp posibil.`,
      )
    } catch (error) {
      console.error("Error submitting form:", error)
      onSubmitError(
        "A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou sau să ne contactați telefonic.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-blue-100 dark:border-blue-900/30 shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Contactați-ne</CardTitle>
        </div>
        <CardDescription>Completați formularul pentru a ne trimite un mesaj</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" name="to_email" value="eliezer.cleaning.sm@gmail.com" />

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <FormControl>
                      <Input
                        placeholder="Adresa dumneavoastră de email"
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj</FormLabel>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <FormControl>
                      <Textarea
                        placeholder="Scrieți mesajul dumneavoastră aici..."
                        className="pl-10 min-h-[150px] border-blue-100 dark:border-blue-900/30 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se procesează...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Trimite Mesaj
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
