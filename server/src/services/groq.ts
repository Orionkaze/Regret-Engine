import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { SimulationMode, SimulationResult } from '../types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const fallbacksPath = path.join(__dirname, '../../data/fallbacks.json');

function buildPrompt(decision: string, mode: SimulationMode): string {
  const modeInstructions: Record<SimulationMode, string> = {
    savage: "Be mercilessly honest. No sugarcoating. Roast them hard.",
    motivational: "Be sarcastically positive. Pretend everything will work out while clearly showing it won't.",
    reality: "Be cold and clinical. Just the facts. No emotion. Like a doctor reading a bad diagnosis.",
  };

  return `
The user is about to make this decision: "${decision}"

Personality mode: ${mode}
Instructions for this mode: ${modeInstructions[mode]}

Respond ONLY with a JSON object matching this exact schema:
{
  "regretScore": <number 0-100>,
  "scoreLabel": <string — one of: "Chill King", "Minor L", "Questionable Choices", "Self-Sabotage Arc", "Congrats, You Played Yourself">,
  "roastText": <string — 1-2 sentences, the killer one-liner>,
  "outcomes": {
    "day1": <string — what happens in the first day>,
    "week1": <string — what happens in the first week>,
    "month1": <string — what happens in the first month>,
    "year1": <string — where they are in a year>
  },
  "moodData": [
    { "label": "Now", "vibes": <number 0-100> },
    { "label": "1 Week", "vibes": <number 0-100> },
    { "label": "1 Month", "vibes": <number 0-100> },
    { "label": "6 Months", "vibes": <number 0-100> },
    { "label": "1 Year", "vibes": <number 0-100> }
  ],
  "category": <string — one of: "relationship", "work", "finance", "health", "gym", "food", "sleep", "study", "social", "other">
}
  `.trim();
}

function getFallbackResponse(): SimulationResult {
  try {
    const rawData = fs.readFileSync(fallbacksPath, 'utf-8');
    const parsed = JSON.parse(rawData);
    return parsed.default as SimulationResult;
  } catch (e) {
    console.error('Failed to read fallbacks:', e);
    throw new Error('Fallback failed.');
  }
}

export async function generateRegretResponse(
  decision: string,
  mode: SimulationMode,
  repeatCount: number
): Promise<SimulationResult> {
  try {
    const SYSTEM_PROMPT = `
You are Regret Engine — a brutally honest AI life simulator.
Your job: given a bad decision, simulate its consequences with dark humor and uncomfortable accuracy.
Rules:
- Be specific, not generic. Reference real-life consequences.
- The roast should sting but not be cruel beyond reason.
- Scale severity to match the decision's actual risk level.
- Return ONLY valid JSON. No preamble, no markdown fences.
    `.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.85,
      max_tokens: 800,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildPrompt(decision, mode) }
      ],
    });

    const raw = completion.choices[0].message.content ?? '';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    const parsed: unknown = JSON.parse(cleaned);
    
    // Add escalation suffix based on habit memory repeatCount
    const data = parsed as SimulationResult;
    const escalationSuffix: Record<number, string> = {
      3:  "Third time. We're noticing a pattern.",
      5:  "Fifth time. This isn't a mistake anymore — it's a lifestyle.",
      7:  "Seventh time. You are being scientifically studied.",
      10: "Tenth time. You've transcended bad decisions into a philosophical stance.",
    };

    const threshold = [10, 7, 5, 3].find(t => repeatCount >= t);
    if (threshold && data.roastText) {
      data.roastText += ` ${escalationSuffix[threshold]}`;
    }

    return data;
  } catch (err) {
    console.error('[groq] Falling back to pre-written response:', err);
    return getFallbackResponse();
  }
}
