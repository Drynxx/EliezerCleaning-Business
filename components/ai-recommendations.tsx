"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Sparkles, CheckCircle, ArrowRight, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface Question {
  id: string
  question: string
  type: "radio" | "slider"
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
}

interface Recommendation {
  service: string
  description: string
  benefits: string[]
  price: string
  badge?: string
}

export function AIRecommendations() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const questions: Question[] = [
    {
      id: "property_type",
      question: "Ce tip de proprietate doriți să curățați?",
      type: "radio",
      options: [
        { value: "apartment", label: "Apartament" },
        { value: "house", label: "Casă" },
        { value: "office", label: "Birou" },
        { value: "commercial", label: "Spațiu Comercial" },
      ],
    },
    {
      id: "size",
      question: "Care este suprafața aproximativă (în metri pătrați)?",
      type: "slider",
      min: 20,
      max: 300,
      step: 10,
    },
    {
      id: "frequency",
      question: "Cât de des aveți nevoie de servicii de curățenie?",
      type: "radio",
      options: [
        { value: "once", label: "O singură dată" },
        { value: "weekly", label: "Săptămânal" },
        { value: "biweekly", label: "La două săptămâni" },
        { value: "monthly", label: "Lunar" },
      ],
    },
    {
      id: "pets",
      question: "Aveți animale de companie?",
      type: "radio",
      options: [
        { value: "yes", label: "Da" },
        { value: "no", label: "Nu" },
      ],
    },
    {
      id: "priority",
      question: "Care este prioritatea dumneavoastră principală?",
      type: "radio",
      options: [
        { value: "thoroughness", label: "Curățenie minuțioasă" },
        { value: "speed", label: "Rapiditate" },
        { value: "eco", label: "Produse ecologice" },
        { value: "price", label: "Preț accesibil" },
      ],
    },
  ]

  const handleRadioChange = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    })
  }

  const handleSliderChange = (value: number[]) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value[0],
    })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generateRecommendations()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateRecommendations = () => {
    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      // In a real implementation, this would call an API to get AI-generated recommendations
      const generatedRecommendations: Recommendation[] = [
        {
          service: "Curățenie Premium Personalizată",
          description: "Serviciu complet adaptat nevoilor dumneavoastră specifice, cu atenție deosebită la detalii.",
          benefits: [
            "Curățare profundă a tuturor suprafețelor",
            "Tratament special pentru zonele cu animale de companie",
            "Produse premium, non-toxice",
            "Echipă dedicată cu experiență",
          ],
          price: "25-30 RON/mp",
          badge: "Recomandat AI",
        },
        {
          service: "Pachet Eco-Friendly",
          description: "Curățenie completă folosind exclusiv produse ecologice, certificate, prietenoase cu mediul.",
          benefits: [
            "Produse 100% biodegradabile",
            "Sigur pentru copii și animale",
            "Reduce alergenii din casă",
            "Fără reziduuri chimice",
          ],
          price: "22-28 RON/mp",
        },
        {
          service: "Curățenie de Întreținere Regulată",
          description: "Plan personalizat de curățenie regulată pentru a menține spațiul dumneavoastră impecabil.",
          benefits: [
            "Programare flexibilă",
            "Prețuri reduse pentru abonamente",
            "Aceeași echipă de fiecare dată",
            "Raport detaliat după fiecare vizită",
          ],
          price: "18-22 RON/mp",
        },
      ]

      setRecommendations(generatedRecommendations)
      setIsGenerating(false)
    }, 2000)
  }

  const currentQuestion = questions[currentStep]
  const hasAnswer = answers[currentQuestion?.id] !== undefined

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          Recomandări Personalizate AI
        </CardTitle>
        <CardDescription>
          Răspundeți la câteva întrebări pentru a primi recomandări personalizate pentru serviciile noastre
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                Pasul {currentStep + 1} din {questions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

              {currentQuestion.type === "radio" && (
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={handleRadioChange}
                  className="space-y-3"
                >
                  {currentQuestion.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "slider" && (
                <div className="space-y-4">
                  <Slider
                    defaultValue={[answers[currentQuestion.id] || currentQuestion.min || 0]}
                    max={currentQuestion.max}
                    min={currentQuestion.min}
                    step={currentQuestion.step}
                    onValueChange={handleSliderChange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span>{currentQuestion.min} mp</span>
                    <span className="font-medium">{answers[currentQuestion.id] || currentQuestion.min} mp</span>
                    <span>{currentQuestion.max} mp</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Bazat pe răspunsurile dumneavoastră, AI-ul nostru a generat următoarele recomandări personalizate:
              </p>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-4 transition-all duration-300",
                    rec.badge ? "border-blue-500 shadow-md" : "border-gray-200 dark:border-gray-700",
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{rec.service}</h3>
                    {rec.badge && <Badge className="bg-blue-500 hover:bg-blue-600">{rec.badge}</Badge>}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                  <div className="space-y-2 mb-4">
                    {rec.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">{rec.price}</div>
                    <Button size="sm" onClick={() => (window.location.href = "#booking")}>
                      Rezervă
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p>AI-ul nostru analizează răspunsurile dumneavoastră...</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {recommendations.length === 0 ? (
          <>
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              Înapoi
            </Button>
            <Button onClick={handleNext} disabled={!hasAnswer}>
              {currentStep === questions.length - 1 ? "Generează Recomandări" : "Continuă"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setRecommendations([])
              setCurrentStep(0)
              setAnswers({})
            }}
            className="w-full"
          >
            Începe o nouă evaluare
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
