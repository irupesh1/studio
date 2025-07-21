import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-user-sentiment.ts';
import '@/ai/flows/generate-response.ts';
import '@/ai/flows/text-to-speech.ts';
