'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Shirt, Trash2 } from "lucide-react"
import AddItemForm from './AddItemForm'
import { WardrobeItem } from '@/types'
import React from "react"

interface WardrobeListProps {
  wardrobe: WardrobeItem[];
  setWardrobe: React.Dispatch<React.SetStateAction<WardrobeItem[]>>;
}

export default function WardrobeList({ wardrobe, setWardrobe }: WardrobeListProps) {
  const handleAddItem = (newItem: Omit<WardrobeItem, 'id'>) => {
    setWardrobe(prev => [...prev, { ...newItem, id: prev.length + 1 }])
  }

  const handleRemoveItem = (id: number) => {
    setWardrobe(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wardrobe</CardTitle>
      </CardHeader>
      <CardContent>
        <AddItemForm onAddItem={handleAddItem} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wardrobe.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <Shirt className="h-8 w-8 mb-2" />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.color} - {item.type}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}