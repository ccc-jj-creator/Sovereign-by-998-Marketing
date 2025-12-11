import { GoogleGenAI, Type } from "@google/genai";

// Lazy initialization to prevent app crash on load if env var is missing
const getAiClient = () => {
  // Use process.env.API_KEY as per coding guidelines
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export interface HookResult {
  headline: string;
  subheadline: string;
  rationale: string;
}

export interface RoastResult {
  score: number;
  critique: string;
  rewrite: string;
}

export const generateHooks = async (niche: string, goal: string): Promise<HookResult[]> => {
  const ai = getAiClient();
  if (!ai) throw new Error("API configuration missing");

  const prompt = `You are a world-class financial marketing copywriter for ultra-high-net-worth individuals.
  
  Target Niche: "${niche}"
  AUM Growth Goal: "${goal}"
  
  Generate 3 exclusive, high-net-worth marketing hooks that would resonate with this specific niche. 
  The tone should be authoritative, exclusive, and "wealth repellent" to non-qualified leads.
  
  Return strictly JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              subheadline: { type: Type.STRING },
              rationale: { type: Type.STRING }
            },
            required: ["headline", "subheadline", "rationale"]
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("Failed to generate hooks: Empty response");
    }
    return JSON.parse(response.text) as HookResult[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const roastPositioning = async (currentPitch: string): Promise<RoastResult> => {
  const ai = getAiClient();
  if (!ai) throw new Error("API configuration missing");

  const prompt = `Act as a brutal, high-end brand consultant for a wealth management firm. 
  Analyze this current value proposition/headline: "${currentPitch}".
  
  1. Give it a "Luxury Score" from 0-100 (where 0 is a commodity insurance salesman and 100 is a Private Family Office).
  2. Write a 1-sentence critique explaining why it sounds cheap or generic.
  3. Write a "Sovereign Rewrite" that elevates the status immediately.
  
  Return strictly JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            critique: { type: Type.STRING },
            rewrite: { type: Type.STRING }
          },
          required: ["score", "critique", "rewrite"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RoastResult;
    }
    throw new Error("Failed to parse response");
  } catch (error) {
    console.error("Gemini Roast Error:", error);
    throw error;
  }
};