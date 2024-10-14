'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Camera } from "lucide-react"
import React from 'react'

export default function ReferenceOutfitUpload() {
  const [referenceOutfit, setReferenceOutfit] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setReferenceOutfit(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Reference Outfit</CardTitle>
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
      </CardContent>
    </Card>
  )
}