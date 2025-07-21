'use server';

import { analyzeUserSentiment } from '@/ai/flows/analyze-user-sentiment';
import { generateResponse } from '@/ai/flows/generate-response';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import type { Message } from '@/types';

export async function sendMessage(history: Message[]): Promise<Message> {
  try {
    const latestMessage = history[history.length - 1];
    const { sentiment } = await analyzeUserSentiment({ message: latestMessage.content });

    const { response } = await generateResponse({
      history: history.map(({id, audioUrl, ...rest}) => rest),
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
