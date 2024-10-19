'use client'

import { useEffect, useState, ChangeEvent } from "react"
import { Shirt, Trash2, Upload, Plus } from "lucide-react"
import { WardrobeItem } from "../../types"
import { Card, CardHeader, CardContent, Input, Select, Button } from "@mui/material";
import { CardTitle } from "./ui/Card";
import { Label } from "./ui/label";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";


interface WardrobeListProps {
  wardrobe: WardrobeItem[];
  setWardrobe: React.Dispatch<React.SetStateAction<WardrobeItem[]>>;
}

export default function WardrobeList({ wardrobe, setWardrobe }: WardrobeListProps) {
  const [classifier, setClassifier] = useState<any>(null);
  const [newItem, setNewItem] = useState({ name: '', color: '', type: '' });
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [ml5, setMl5] = useState<any>(null);

  useEffect(() => {
    // Dynamically import ml5 only on the client side
    import('ml5').then((ml5Module) => {
      setMl5(ml5Module.default);
    });
  }, []);

  useEffect(() => {
    if (ml5) {
      const initClassifier = async () => {
        const imageClassifier = await ml5.imageClassifier('MobileNet');
        setClassifier(imageClassifier);
      };
      initClassifier();
    }
  }, [ml5]);

  const handleAddItem = () => {
    if (newItem.name && newItem.color && newItem.type) {
      setWardrobe(prev => [...prev, { ...newItem, id: prev.length + 1 }]);
      setNewItem({ name: '', color: '', type: '' });
      setIsAddingItem(false);
    }
  }

  const handleRemoveItem = (id: number) => {
    setWardrobe(prev => prev.filter(item => item.id !== id));
  }

  async function handleWardrobeImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0] && classifier) {
      const file = event.target.files[0];
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      
      img.onload = async () => {
        const results = await classifier.classify(img);
        const predictedItem = results[0].label;
        const itemType = mapPredictionToItemType(predictedItem);
        
        setNewItem({
          name: `New ${itemType}`,
          type: itemType,
          color: 'Unknown',
        });
        setIsAddingItem(true);
        
        URL.revokeObjectURL(img.src);
      };
    }
  }

  function mapPredictionToItemType(prediction: string): string {
    const lowerPrediction = prediction.toLowerCase();
    const mapping: { [key: string]: string[] } = {
      'Shirt': ['shirt', 't-shirt', 'dress shirt', 'blouse', 'polo'],
      'Pants': ['pants', 'trousers', 'jeans', 'slacks', 'chinos'],
      'Shorts': ['shorts', 'bermudas'],
      'Shoes': ['shoe', 'sneaker', 'boot', 'loafer', 'sandals', 'flip-flop'],
      'Dress': ['dress', 'gown', 'sundress'],
      'Skirt': ['skirt'],
      'Jacket': ['jacket', 'blazer', 'coat'],
      'Sweater': ['sweater', 'jumper', 'hoodie', 'cardigan'],
      'Hat': ['hat', 'cap', 'beanie'],
      'Bag': ['bag', 'backpack', 'purse'],
      'Scarf': ['scarf'],
      'Gloves': ['gloves'],
    };
  
    for (const [itemType, keywords] of Object.entries(mapping)) {
      if (keywords.some(keyword => lowerPrediction.includes(keyword))) {
        return itemType;
      }
    }
  
    return 'Other';
  }

  return (
    <Card className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl text-pink-600">Your Wardrobe</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <Label htmlFor="wardrobeUpload" className="cursor-pointer block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors">
              <Upload className="mx-auto h-16 w-16 text-gray-400" />
              <span className="mt-4 block text-lg font-medium text-gray-700">
                Upload clothing item
              </span>
              <p className="mt-2 text-sm text-gray-500">
                Our AI will analyze the style and help you add it to your wardrobe
              </p>
            </div>
            <Input id="wardrobeUpload" type="file" className="sr-only" onChange={handleWardrobeImageUpload} />
          </Label>
        </div>

        {isAddingItem && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-pink-600">Add New Item</h3>
            <div className="space-y-4">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Input
                placeholder="Color"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
              />
              {/* <Select
                value={newItem.type}
                onChange={(value) => setNewItem({ ...newItem, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shirt">Shirt</SelectItem>
                  <SelectItem value="Pants">Pants</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Dress">Dress</SelectItem>
                  <SelectItem value="Skirt">Skirt</SelectItem>
                  <SelectItem value="Jacket">Jacket</SelectItem>
                  <SelectItem value="Accessory">Accessory</SelectItem>
                </SelectContent>
              </Select> */}
              <Button onClick={handleAddItem} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                Add to Wardrobe
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wardrobe.map((item) => (
            <Card key={item.id} className="bg-gray-50 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mb-2">
                  <Shirt className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-semibold text-center">{item.name}</h3>
                <p className="text-sm text-gray-600 text-center">{item.color}</p>
                <p className="text-xs text-gray-500 text-center">{item.type}</p>
                <Button
                  
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-2"
                >
                  <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-gray-50 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setIsAddingItem(true)}>
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-600">Add Item</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}