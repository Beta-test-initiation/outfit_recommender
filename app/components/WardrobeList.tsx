'use client'

import { useEffect, useState, ChangeEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Shirt, Trash2, Upload } from "lucide-react"
import AddItemForm from './AddItemForm'
import { WardrobeItem } from "../../types"
import { Label } from "./ui/label"
import { Input } from "@mui/material"
import * as ml5 from "ml5"

interface WardrobeListProps {
  wardrobe: WardrobeItem[];
  setWardrobe: React.Dispatch<React.SetStateAction<WardrobeItem[]>>;
}

export default function WardrobeList({ wardrobe, setWardrobe }: WardrobeListProps) {
  const [classifier, setClassifier] = useState<any>(null);

  useEffect(() => {
    // Initialize the image classifier when the component mounts
    const initClassifier = async () => {
      const imageClassifier = await ml5.imageClassifier('MobileNet');
      setClassifier(imageClassifier);
    };
    initClassifier();
  }, []);

  const handleAddItem = (newItem: Omit<WardrobeItem, 'id'>) => {
    setWardrobe(prev => [...prev, { ...newItem, id: prev.length + 1 }])
  }

  const handleRemoveItem = (id: number) => {
    setWardrobe(prev => prev.filter(item => item.id !== id))
  }

  async function handleWardrobeImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0] && classifier) {
      const file = event.target.files[0];
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      
      img.onload = async () => {
        const results = await classifier.classify(img);
        console.log('Classification Results:', results);
        
        // Assuming the first result is the most likely
        const predictedItem = results[0].label;
        
        // You might want to map the prediction to your wardrobe item types
        const itemType = mapPredictionToItemType(predictedItem);
        
        // Add the new item to the wardrobe
        handleAddItem({
          name: `New ${itemType}`,
          type: itemType,
          color: 'Unknown', // You might want to use a color detection library here
        });
        
        URL.revokeObjectURL(img.src);
      };
    }
  }

  function mapPredictionToItemType(prediction: string): string {
    // This is a simple mapping function. You might want to expand this based on your needs
    console.log(prediction);
    if (prediction.includes('shirt') || prediction.includes('t-shirt')) return 'Shirt';
    if (prediction.includes('pants') || prediction.includes('trousers')) return 'Pants';
    if (prediction.includes('shoe')) return 'Shoes';
    // Add more mappings as needed
    return 'Other';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wardrobe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="wardrobeUpload" className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-700">
                Upload clothing item
              </span>
            </div>
            <Input id="wardrobeUpload" type="file" className="sr-only" onChange={handleWardrobeImageUpload} />
          </Label>
        </div>
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