import { NextRequest, NextResponse } from 'next/server';

async function query(data: Record<string, any>) {
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
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided.' }, { status: 400 });
  }

  const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  if (!HF_TOKEN) {
    return NextResponse.json({ error: 'Missing Hugging Face token' }, { status: 500 });
  }

  try {
    const result = await query({
      inputs: prompt,
      parameters: {
        max_new_tokens: 128,
        temperature: 0.7,
      },
    });

    const generated =
      Array.isArray(result) && result.length > 0 && result[0].generated_text
        ? result[0].generated_text
        : 'No response';

    return NextResponse.json({ text: generated });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
