import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client securely
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

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

const checkApiKey = () => {
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please configure it in the environment.");
  }
};

export const generateHooks = async (niche: string, goal: string): Promise<HookResult[]> => {
  checkApiKey();

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

    if (response.text) {
      return JSON.parse(response.text) as HookResult[];
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const roastPositioning = async (currentPitch: string): Promise<RoastResult> => {
  checkApiKey();

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