'use client'

import { useState } from 'react'
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { RefreshCw } from "lucide-react"
import { WardrobeItem, OutfitSuggestion } from '@/types'
import React from 'react'

export default function OutfitGenerator({ wardrobe }: { wardrobe: WardrobeItem[] }) {
  const [selectedVibe, setSelectedVibe] = useState('')
  const [outfitSuggestion, setOutfitSuggestion] = useState<OutfitSuggestion | null>(null)

  const generateOutfit = () => {
    const top = wardrobe.find(item => item.type === 'Top')
    const bottom = wardrobe.find(item => item.type === 'Bottom')
    const shoes = wardrobe.find(item => item.type === 'Shoes')
    setOutfitSuggestion({ top, bottom, shoes })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Outfit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select value={selectedVibe} onValueChange={setSelectedVibe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select style vibe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="sporty">Sporty</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateOutfit}>Generate Outfit</Button>
        </div>
        {outfitSuggestion && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Suggested Outfit:</h3>
              <Button variant="outline" size="sm" onClick={generateOutfit}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <ul className="list-disc list-inside">
              {outfitSuggestion.top && <li>{outfitSuggestion.top.name}</li>}
              {outfitSuggestion.bottom && <li>{outfitSuggestion.bottom.name}</li>}
              {outfitSuggestion.shoes && <li>{outfitSuggestion.shoes.name}</li>}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}