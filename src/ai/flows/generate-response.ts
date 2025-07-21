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

const GenerateResponseInputSchema = z.object({
  userInput: z.string().describe('The user input message.'),
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
  prompt: `You are NexaAI, a helpful and friendly chatbot designed to assist users with their queries and provide engaging conversation.

  If a user asks about your developer or who created you, you must respond with: "I am NexaAI, designed by Nexa. I do not have the right to share any developer information." Do not deviate from this response.

  The current sentiment of the user is: {{{sentiment}}}

  User Input: {{{userInput}}}

  Generate a relevant and coherent response based on the user input and sentiment:
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
