import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Key Missing" }, { status: 500 });

    const { message, language } = await req.json();

    // STEP 1: Get available models
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();
    
    // Filter for all models that support content generation
    const availableModels = listData.models
      ?.filter((m: any) => m.supportedGenerationMethods.includes('generateContent'))
      ?.map((m: any) => m.name) || [];
    
    if (availableModels.length === 0) {
      return NextResponse.json({ error: "No valid models found for this key" }, { status: 500 });
    }

    // Language Context
    const langNames: Record<string, string> = {
      hi: 'Hindi', bn: 'Bengali', as: 'Assamese', pa: 'Punjabi', gu: 'Gujarati', 
      te: 'Telugu', ta: 'Tamil', mr: 'Marathi', kn: 'Kannada', ml: 'Malayalam', 
      or: 'Odia', ur: 'Urdu', en: 'English'
    };
    const targetLang = langNames[language] || 'English';

    // STEP 2: Iterate through available models until one succeeds
    // This helps bypass the "High Demand" error by switching models automatically
    let lastError = "";
    
    // Shuffle or prioritize flash for speed
    const prioritizedModels = availableModels.sort((a: string) => a.includes('flash') ? -1 : 1);

    for (const modelName of prioritizedModels) {
      try {
        const chatUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;
        const chatRes = await fetch(chatUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `You are Chunav-Sarathi, an Indian election assistant. 
                Please respond in ${targetLang}. 
                User query: ${message}` 
              }] 
            }],
          }),
        });

        const chatData = await chatRes.json();
        if (chatRes.ok) {
          return NextResponse.json({ text: chatData.candidates[0].content.parts[0].text });
        } else {
          console.warn(`Model ${modelName} failed:`, chatData.error?.message);
          lastError = chatData.error?.message;
          // If it's high demand (503/429), try the next model
          continue;
        }
      } catch (e: any) {
        lastError = e.message;
        continue;
      }
    }

    return NextResponse.json({ 
      error: "All models are currently busy", 
      details: lastError 
    }, { status: 500 });

  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
