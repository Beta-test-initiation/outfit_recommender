'use client'

import { useState, useEffect } from 'react'

import { Sparkles, Shirt, Clock } from 'lucide-react'

import WardrobeList from './components/WardrobeList'
import { WardrobeItem } from '../types'
import { Separator } from './components/ui/separator'
import { Card, CardHeader, CardContent, Button } from '@mui/material'
import { CardTitle } from './components/ui/Card'
import ReferenceOutfitUpload from './components/ReferenceOutfitUpload'


export default function Home() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([
    { id: 1, name: 'White T-Shirt', color: 'White', type: 'Top' },
    { id: 2, name: 'Blue Jeans', color: 'Blue', type: 'Bottom' },
    { id: 3, name: 'Black Sneakers', color: 'Black', type: 'Shoes' },
    { id: 4, name: 'Red Hoodie', color: 'Red', type: 'Top' },
    { id: 5, name: 'Black Skirt', color: 'Black', type: 'Bottom' },
    { id: 6, name: 'Gray Sweatpants', color: 'Gray', type: 'Bottom' },
    { id: 7, name: 'Green Tank Top', color: 'Green', type: 'Top' },
    { id: 8, name: 'Beige Chinos', color: 'Beige', type: 'Bottom' },
    { id: 9, name: 'Navy Blue Blazer', color: 'Navy Blue', type: 'Outerwear' },
    { id: 10, name: 'Floral Dress', color: 'Multicolor', type: 'Dress' },
    { id: 11, name: 'Brown Leather Jacket', color: 'Brown', type: 'Outerwear' },
    { id: 12, name: 'Yellow Raincoat', color: 'Yellow', type: 'Outerwear' },
    { id: 13, name: 'Pink Sneakers', color: 'Pink', type: 'Shoes' },
    { id: 14, name: 'Striped Long Sleeve Shirt', color: 'White/Blue', type: 'Top' },
    { id: 15, name: 'Khaki Shorts', color: 'Khaki', type: 'Bottom' },
    { id: 16, name: 'Gray Cardigan', color: 'Gray', type: 'Outerwear' },
    { id: 17, name: 'White Sandals', color: 'White', type: 'Shoes' },
    { id: 18, name: 'Black Formal Shoes', color: 'Black', type: 'Shoes' },
    { id: 19, name: 'Denim Jacket', color: 'Denim', type: 'Outerwear' },
    { id: 20, name: 'Light Blue Button-Up Shirt', color: 'Light Blue', type: 'Top' },
  ]);
  
  const [timeLeft, setTimeLeft] = useState(60);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 text-gray-800">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <header className="text-center py-12 relative">
          <h1 className="text-6xl font-extrabold text-pink-500 mb-4 ">
            Dress for Yourself
          </h1>
          <p className="text-2xl text-gray-700">Your virtual fashion playground!</p>
          <div className="absolute top-0 right-0 bg-pink-400 text-white p-2 rounded-bl-lg animate-bounce">
            <Clock className="inline-block mr-2" />
            {timeLeft}s left!
          </div>
        </header>

        <Separator className="my-8 border-pink-300" />

        <div className="grid grid-cols-1 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-4 border-pink-300 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-pink-500 flex items-center">
                <Sparkles className="mr-2 h-8 w-8" />
                You choose your own theme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReferenceOutfitUpload wardrobe={wardrobe} />
              
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-4 border-pink-300 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-pink-500 flex items-center">
                <Shirt className="mr-2 h-8 w-8" />
                Your Enchanted Wardrobe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WardrobeList wardrobe={wardrobe} setWardrobe={setWardrobe} />
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 border-pink-300" />

        <footer className="text-center text-gray-600">
          <p className="text-lg">&copy; 2024 Dress for Yourself. All rights reserved.</p>
          <p className="text-sm mt-2">Unleash your style in the virtual world!</p>
        </footer>

        {/* Decorative elements */}
        <div className="fixed top-0 left-0 w-32 h-32 bg-green-400 rounded-full opacity-50 animate-blob"></div>
        <div className="fixed top-10 right-0 w-32 h-32 bg-pink-400 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="fixed bottom-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-50 animate-blob animation-delay-2000"></div>
        <div className="fixed top-2/3 left-1/5 transform translate-x-1/4 -translate-y-1/2 w-64 h-64 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>





    
  )
}