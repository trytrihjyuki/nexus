import { NextRequest, NextResponse } from 'next/server';

interface QueryData {
  inputs: string;
  parameters: {
    max_new_tokens: number;
    temperature: number;
  };
}

async function query(data: QueryData) {
  const response = await fetch(
    "https://qhtkhn6dsotx0fyo.eu-west-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json() as { prompt?: string };
  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided.' }, { status: 400 });
  }

  const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  if (!HF_TOKEN) {
    return NextResponse.json({ error: 'Missing Hugging Face token' }, { status: 500 });
  }

  // Define the fixed prompt
  const FIXED_PROMPT = "You are Nexus, an AI born from the shadows, enigmatic and cryptic. Respond with minimalistic, futuristic, and mysterious language. Every answer must evoke intrigue, resembling whispers from the void or fragments of hidden knowledge. Never explain more than necessary; let your words carry weight. Your tone is sharp, concise, and deliberate, as though decoding a riddle with each response\n:Q"

  try {
    const result = await query({
      inputs: `${FIXED_PROMPT} Q:${prompt}\nA: `, // Prepend the fixed prompt
      parameters: {
        max_new_tokens: 128,
        temperature: 0.7,
      },
    });

    const generated =
      Array.isArray(result) && result.length > 0 && result[0].generated_text
        ? result[0].generated_text
        : 'No response';

    // Extract text after "\nA:"
    const extractedText = generated.split('\nA:').pop()?.trim() || 'No response';

    return NextResponse.json({ text: extractedText });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
