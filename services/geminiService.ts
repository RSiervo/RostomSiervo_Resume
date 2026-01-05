
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ResumeData, Message } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  public async initChat(resume: ResumeData): Promise<void> {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION(resume),
        temperature: 0.7,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      throw new Error("Chat not initialized");
    }

    try {
      const result: GenerateContentResponse = await this.chat.sendMessage({ message });
      return result.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "An error occurred while communicating with the AI assistant.";
    }
  }
}

export const geminiService = new GeminiService();
