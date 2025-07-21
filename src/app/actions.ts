
'use server';

import { generateResponse } from '@/ai/flows/generate-response';
import type { Message } from '@/types';

export async function sendMessage(history: Message[]): Promise<Message> {
  try {
    const latestMessage = history[history.length - 1];

    if (!latestMessage || latestMessage.role !== 'user') {
      throw new Error('Invalid history: Last message must be from the user.');
    }

    const { response } = await generateResponse({
      history: history.map(({id, ...rest}) => rest),
      sentiment: 'neutral', 
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
      content: "I'm sorry, but I encountered an issue while trying to respond. Please try your request again in a moment.",
    };
  }
}
