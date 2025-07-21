
'use server';

import { generateResponse } from '@/ai/flows/generate-response';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import type { Message } from '@/types';

export async function sendMessage(history: Message[]): Promise<Message> {
  try {
    const latestMessage = history[history.length - 1];

    if (!latestMessage || latestMessage.role !== 'user') {
      throw new Error('Invalid history: Last message must be from the user.');
    }

    const { response } = await generateResponse({
      history: history.map(({id, audioDataUri, ...rest}) => rest),
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

export async function regenerateResponse(history: Message[]): Promise<Message> {
  try {
    const userMessages = history.filter(m => m.role === 'user');
    if (userMessages.length === 0) {
      throw new Error('No user message to regenerate.');
    }
    
    // We only need the history up to the last user message to get a new response.
    const lastUserMessageIndex = history.map(m => m.role).lastIndexOf('user');
    const historyForRegeneration = history.slice(0, lastUserMessageIndex + 1);

    const { response } = await generateResponse({
      history: historyForRegeneration.map(({id, audioDataUri, ...rest}) => rest),
      sentiment: 'neutral', 
    });

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
    };
  } catch (error) {
    console.error('Error regenerating response:', error);
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "I couldn't regenerate the response. Please try again.",
    };
  }
}


export async function getAudioForText(text: string): Promise<string | null> {
    try {
        const { audioDataUri } = await textToSpeech({ text });
        return audioDataUri;
    } catch (error) {
        console.error('Error generating audio:', error);
        return null;
    }
}
