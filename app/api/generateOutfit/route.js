// app/api/generateOutfit/route.js
import { NextResponse } from 'next/server';
import { Client } from 'craiyon';

// Initialize the Craiyon client
const craiyon = new Client();

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    // Generate images based on the prompt
    const result = await craiyon.generate({ prompt });

    // The result contains images in base64 format
    const images = result.images.map(image => `data:image/png;base64,${image}`);

    return NextResponse.json({ images }, { status: 201 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Image generation failed.' }, { status: 500 });
  }
}
