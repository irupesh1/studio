'use server';

import { generateResponse } from '@/ai/flows/generate-response';
import type { Message } from '@/types';

export async function sendMessage(history: Message[]): Promise<Message> {
  try {
    const latestMessage = history[history.length - 1];

    const { response } = await generateResponse({
      history: history.map(({id, ...rest}) => rest),
      sentiment: 'neutral', // No longer analyzing sentiment, so passing a default.
    });

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
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
