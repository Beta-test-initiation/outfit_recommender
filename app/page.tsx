'use client'

import { useState } from 'react'

import { WardrobeItem } from '@/types'
import { Separator } from 'radix-ui'
import React from 'react'
import OutfitGenerator from './components/OutfitGenerator'
import ReferenceOutfitUpload from './components/ReferenceOutfitUpload'
import WardrobeList from './components/WardrobeList'

export default function Home() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([
    { id: 1, name: 'White T-Shirt', color: 'White', type: 'Top' },
    { id: 2, name: 'Blue Jeans', color: 'Blue', type: 'Bottom' },
    { id: 3, name: 'Black Sneakers', color: 'Black', type: 'Shoes' },
  ])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold">Outfit Recommender</h1>
      <Separator />
      <ReferenceOutfitUpload />
      <OutfitGenerator wardrobe={wardrobe} />
      <WardrobeList wardrobe={wardrobe} setWardrobe={setWardrobe} />
    </div>
  )
}