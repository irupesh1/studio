'use server';

/**
 * @fileOverview Analyzes the sentiment of user messages to tailor chatbot responses.
 *
 * - analyzeUserSentiment - A function that analyzes the sentiment of user messages.
 * - AnalyzeUserSentimentInput - The input type for the analyzeUserSentiment function.
 * - AnalyzeUserSentimentOutput - The return type for the analyzeUserSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserSentimentInputSchema = z.object({
  message: z.string().describe('The message to analyze for sentiment.'),
});
export type AnalyzeUserSentimentInput = z.infer<typeof AnalyzeUserSentimentInputSchema>;

const AnalyzeUserSentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the message (e.g., positive, negative, neutral).'
    ),
  score: z
    .number()
    .describe('A numerical score representing the sentiment strength.'),
});
export type AnalyzeUserSentimentOutput = z.infer<typeof AnalyzeUserSentimentOutputSchema>;

export async function analyzeUserSentiment(
  input: AnalyzeUserSentimentInput
): Promise<AnalyzeUserSentimentOutput> {
  return analyzeUserSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUserSentimentPrompt',
  input: {schema: AnalyzeUserSentimentInputSchema},
  output: {schema: AnalyzeUserSentimentOutputSchema},
  prompt: `You are a sentiment analysis expert. Analyze the sentiment of the following message and provide a sentiment label (positive, negative, or neutral) and a sentiment score between -1 and 1.

Message: {{{message}}}

Output the sentiment and score in JSON format.`,
});

const analyzeUserSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeUserSentimentFlow',
    inputSchema: AnalyzeUserSentimentInputSchema,
    outputSchema: AnalyzeUserSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
