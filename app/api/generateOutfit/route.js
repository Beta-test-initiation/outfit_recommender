// app/api/generateOutfit/route.js
import { CohereClient } from 'cohere-ai';
import { NextResponse } from 'next/server';

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
    }

    const response = await cohere.chat({
      model: 'command-r-plus-08-2024',
      message: prompt,
      temperature: 0.7,
      // You can add other parameters as needed
    });

    const generatedText = response.text;

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('Error calling Cohere API:', error);
    return NextResponse.json(
      { message: 'Error generating outfit description', error: error.message },
      { status: 500 }
    );
  }
}