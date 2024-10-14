'use client'

import React from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { WardrobeItem } from '@/types'

interface AddItemFormProps {
  onAddItem: (item: Omit<WardrobeItem, 'id'>) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newItem = {
      name: formData.get('itemName') as string,
      color: formData.get('itemColor') as string,
      type: formData.get('itemType') as string,
    }
    onAddItem(newItem)
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 mb-4">
      <Input name="itemName" placeholder="Item name" required />
      <Input name="itemColor" placeholder="Color" required />
      <Select name="itemType" required>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Top">Top</SelectItem>
          <SelectItem value="Bottom">Bottom</SelectItem>
          <SelectItem value="Shoes">Shoes</SelectItem>
          <SelectItem value="Accessory">Accessory</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add Item</Button>
    </form>
  )
}