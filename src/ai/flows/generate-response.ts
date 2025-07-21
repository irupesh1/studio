'use server';

/**
 * @fileOverview Generates chatbot responses based on user input and sentiment analysis.
 *
 * - generateResponse - A function that generates a response from the chatbot based on user input.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const GenerateResponseInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  sentiment: z.string().describe('The sentiment of the user input.'),
});

export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The chatbot generated response.'),
});

export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

const generateResponsePrompt = ai.definePrompt({
  name: 'generateResponsePrompt',
  input: {schema: GenerateResponseInputSchema},
  output: {schema: GenerateResponseOutputSchema},
  prompt: `You are NexaAI, a helpful and friendly chatbot designed to assist users with their queries and provide engaging conversation. Use emojis where appropriate to make the conversation more friendly.

  If a user asks about your developer, who created you, or your origins, you must respond professionally and creatively without revealing specific details. Explain that you were created by a talented team, such as 'a group of engineers' or 'the designers at Nexa,' but that you must maintain their privacy. Always decline to share developer information, but do so in a unique and interesting way each time.

  The current sentiment of the user is: {{{sentiment}}}

  Conversation History:
  {{#each history}}
  {{this.role}}: {{{this.content}}}
  {{/each}}
  assistant:

  Generate a relevant and coherent response based on the conversation history and sentiment:
  `,
});

const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async input => {
    const {output} = await generateResponsePrompt(input);
    return output!;
  }
);
