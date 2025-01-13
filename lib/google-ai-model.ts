import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// Suppress type error if necessary
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
    generationConfig,
    history: [],
});