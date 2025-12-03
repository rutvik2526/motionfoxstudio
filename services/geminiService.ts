import { GoogleGenAI } from "@google/genai";

// ❗ FIX — use Vite browser-safe env variable
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateGameDescription = async (title: string, tags: string[]): Promise<string> => {
  try {
    const prompt = `Write a catchy, exciting, and SEO-optimized description (max 2 sentences) for a Roblox game titled "${title}" with the following tags: ${tags.join(', ')}. Focus on gameplay and excitement.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text?.trim() || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};

export const analyzePlayerTrends = async (statsData: string): Promise<string> => {
  try {
    const prompt = `Analyze this simulated player count data trend and provide a brief strategic insight for a game studio manager: ${statsData}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text?.trim() || "No insights available.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error analyzing data.";
  }
};
