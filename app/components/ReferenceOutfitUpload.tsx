'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/Button"
import { Camera, Loader } from "lucide-react"
import React from 'react'
import * as ml5 from 'ml5'

export default function ReferenceOutfitUpload({ wardrobe }) {
  const [referenceOutfit, setReferenceOutfit] = useState<string | null>(null)
  const [classifier, setClassifier] = useState<any>(null)
  const [imageKeywords, setImageKeywords] = useState<string[]>([])
  const [generatedOutfit, setGeneratedOutfit] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Initialize ml5 classifier
    const initClassifier = async () => {
      const imageClassifier = await ml5.imageClassifier('MobileNet')
      setClassifier(imageClassifier)
    }
    initClassifier()
  }, [])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && classifier) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string
        setReferenceOutfit(dataUrl)
        
        // Create an image element for ml5 to analyze
        const img = document.createElement('img')
        img.src = dataUrl
        img.onload = async () => {
          const results = await classifier.classify(img)
          const keywords = results.map(result => result.label.split(',')[0].trim())
          setImageKeywords(keywords)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const generateOutfit = async () => {
    if (!referenceOutfit || imageKeywords.length === 0) {
      alert('Please upload an image first.')
      return
    }

    setIsLoading(true)

    const top = wardrobe.find(item => item.type === 'Top')
    const bottom = wardrobe.find(item => item.type === 'Bottom')
    const shoes = wardrobe.find(item => item.type === 'Shoes')

    const keywordString = imageKeywords.join(', ')
    const prompt = `Create an outfit with a similar vibe to an image containing ${keywordString}. The outfit should include a ${top?.name} (${top?.color}), ${bottom?.name} (${bottom?.color}), and ${shoes?.name} (${shoes?.color}). Describe a few options.`
    console.log(prompt);
    try {
      const response = await fetch('/api/generateOutfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const result = await response.json()
      console.log(result);
      setGeneratedOutfit(result.text)
    } catch (error) {
      console.error('Error generating outfit description:', error)
      alert('An error occurred while generating the outfit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-pink-600'>Upload Reference Outfit</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">
          Upload a picture of an outfit you like. Our AI will analyze the style and colors to generate recommendations based on your wardrobe. This helps us understand your preferences and create outfits that match your style.
        </p>
        <Label htmlFor="picture" className="cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {referenceOutfit ? (
              <Image src={referenceOutfit} alt="Reference Outfit" width={200} height={200} className="mx-auto" />
            ) : (
              <>
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-700">
                  Upload a picture
                </span>
              </>
            )}
          </div>
          <Input id="picture" type="file" className="sr-only" onChange={handleImageUpload} />
        </Label>
        {imageKeywords.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Detected keywords:</p>
            <p>{imageKeywords.join(', ')}</p>
          </div>
        )}
        <Button 
          className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-transform duration-200" 
          onClick={generateOutfit} 
          disabled={!referenceOutfit || isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Generating Outfit...
            </>
          ) : (
            'Generate Outfit'
          )}
        </Button>
        {generatedOutfit && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Suggested Outfit:</h3>
            <p className="whitespace-pre-wrap">{generatedOutfit}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}