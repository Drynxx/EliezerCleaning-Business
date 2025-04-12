"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Upload, Sparkles, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AssessmentResult {
  serviceType: string
  estimatedTime: string
  estimatedPrice: string
  recommendations: string[]
}

export function AICleaningAssessment() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)

      // Simulate file upload
      setTimeout(() => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setUploadedImage(reader.result as string)
          setIsUploading(false)
          analyzeImage()
        }
        reader.readAsDataURL(file)
      }, 1500)
    }
  }

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    // For demo purposes, we'll simulate uploading a sample image
    setIsUploading(true)

    // Simulate camera capture
    setTimeout(() => {
      setUploadedImage("/placeholder.svg?height=400&width=600")
      setIsUploading(false)
      analyzeImage()
    }, 1500)
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      setAssessmentResult({
        serviceType: "Curățenie Profesională Standard",
        estimatedTime: "3-4 ore",
        estimatedPrice: "350-450 RON",
        recommendations: [
          "Curățare profundă a podelelor",
          "Ștergerea prafului de pe toate suprafețele",
          "Curățarea și dezinfectarea băilor",
          "Aspirarea tapițeriei și a covoarelor",
        ],
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const resetAssessment = () => {
    setUploadedImage(null)
    setAssessmentResult(null)
    setActiveTab("upload")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          Evaluare AI a Spațiului
        </CardTitle>
        <CardDescription>
          Încărcați o fotografie a spațiului dumneavoastră pentru o evaluare automată și recomandări personalizate
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedImage ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Încărcare Imagine</TabsTrigger>
              <TabsTrigger value="camera">Folosește Camera</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="py-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12">
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Apăsați pentru a încărca</span>
                  <span className="text-gray-500 dark:text-gray-400"> sau trageți și plasați</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG sau WEBP (max. 10MB)</p>
              </div>
            </TabsContent>
            <TabsContent value="camera" className="py-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12">
                <Camera className="h-10 w-10 text-gray-400 mb-4" />
                <Button onClick={handleCameraCapture} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Se procesează...
                    </>
                  ) : (
                    <>Fotografiază Spațiul</>
                  )}
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Asigurați-vă că spațiul este bine iluminat
                </p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Spațiu încărcat"
                className="w-full h-64 object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p>Analizăm spațiul dumneavoastră...</p>
                  </div>
                </div>
              )}
            </div>

            {assessmentResult && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Rezultatul Evaluării
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Serviciu Recomandat</p>
                    <p className="font-medium">{assessmentResult.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Timp Estimat</p>
                    <p className="font-medium">{assessmentResult.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Preț Estimat</p>
                    <p className="font-medium">{assessmentResult.estimatedPrice}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recomandări</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {assessmentResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {uploadedImage ? (
          <>
            <Button variant="outline" onClick={resetAssessment}>
              Evaluare Nouă
            </Button>
            <Button onClick={() => (window.location.href = "#booking")}>Programează Serviciu</Button>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic w-full text-center">
            Datele dumneavoastră sunt procesate securizat și nu sunt stocate permanent
          </p>
        )}
      </CardFooter>
    </Card>
  )
}
