'use server';

import { analyzeUserSentiment } from '@/ai/flows/analyze-user-sentiment';
import { generateResponse } from '@/ai/flows/generate-response';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import type { Message } from '@/types';

export async function sendMessage(message: string): Promise<Message> {
  try {
    const { sentiment } = await analyzeUserSentiment({ message });

    const { response } = await generateResponse({
      userInput: message,
      sentiment: sentiment,
    });

    const { media } = await textToSpeech({ response });

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      audioUrl: media,
    };
  } catch (error) {
    console.error('Error processing message:', error);
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Sorry, I'm having trouble connecting. Please try again later.",
    };
  }
}
