// OutfitGenerator.js
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RefreshCw } from 'lucide-react';


export default function OutfitGenerator({ wardrobe }) {
  const [selectedVibe, setSelectedVibe] = useState('');
  const [outfitSuggestion, setOutfitSuggestion] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateOutfit = async () => {
    const top = wardrobe.find(item => item.type === 'Top');
    const bottom = wardrobe.find(item => item.type === 'Bottom');
    const shoes = wardrobe.find(item => item.type === 'Shoes');
    setOutfitSuggestion({ top, bottom, shoes });
   
    const prompt = `An outfit that includes a ${top?.name}, ${bottom?.name}, and ${shoes?.name} in a ${selectedVibe} style.`;
    console.log(prompt);
    setLoading(true);

    try {
      const response = await fetch('/api/generateOutfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();
      console.log(result);
      setGeneratedImage(result.output[0]); // Assuming output is an array of URLs
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Button onClick={generateOutfit} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Outfit'}
          </Button>
        </div>
        {generatedImage && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Suggested Outfit Image:</h3>
            <img src={generatedImage} alt="Suggested outfit" className="rounded-md border" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
