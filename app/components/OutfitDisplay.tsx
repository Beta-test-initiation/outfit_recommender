'use client'
import React, { useState, useEffect } from 'react'

interface OutfitSuggestion {
  name: string
  items: string[]
}

interface OutfitRecommenderProps {
  outfitString: string
}

export default function OutfitRecommender({ outfitString }: OutfitRecommenderProps) {
  const [outfitSuggestions, setOutfitSuggestions] = useState<OutfitSuggestion[]>([])
  const [activeOutfit, setActiveOutfit] = useState(0)

  useEffect(() => {
    const parsedOutfits = parseOutfits(outfitString)
    setOutfitSuggestions(parsedOutfits)
  }, [outfitString])

  const parseOutfits = (text: string): OutfitSuggestion[] => {
    // Regex to match outfit blocks
    const outfitRegex = /\*\*(.*?)\*\*\:\n([\s\S]*?)(?=\*\*|$)/g
    const outfits: OutfitSuggestion[] = []
    let match

    while ((match = outfitRegex.exec(text)) !== null) {
      const name = match[1].trim() // Extract outfit name
      const description = match[2].trim() // Extract outfit description
      
      // Split description into items based on the hyphen
      const items = description.split('\n').filter(line => line.startsWith('-')).map(item => item.replace(/^-/, '').trim())
      outfits.push({ name, items }) // Add to outfits array
    }

    return outfits
  }

  if (outfitSuggestions.length === 0) {
    return <div>No outfit suggestions available.</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Outfit Recommendations</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-gray-100 p-4">
          {outfitSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className={`w-full text-left p-2 mb-2 rounded ${
                activeOutfit === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveOutfit(index)}
            >
              {suggestion.name}
            </button>
          ))}
        </div>
        <div className="w-full md:w-2/3 p-4">
          <h3 className="text-xl font-semibold mb-4">{outfitSuggestions[activeOutfit].name}</h3>
          <ul className="space-y-2">
            {outfitSuggestions[activeOutfit].items.map((item, index) => (
              <li key={index} className="bg-gray-50 p-2 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
