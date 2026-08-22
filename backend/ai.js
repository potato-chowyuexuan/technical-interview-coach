/**
 * ai.js — Calls Claude (Anthropic API) to grade a coding interview session.
 *
 * Expects the model to return a JSON object matching the FeedbackResult schema below.
 *
 * FeedbackResult {
 *   scores: {
 *     problemClarification: { score: 0-10, comments: string },
 *     complexityDiscussion: { score: 0-10, comments: string },
 *     communicationQuality: { score: 0-10, comments: string },
 *     codeCorrectness:      { score: 0-10, comments: string },
 *   },
 *   overallScore: 0-10,
 *   summary: string,           // 2-3 sentence overall take
 *   strengths: string[],       // 2-3 bullet points
 *   improvements: string[],    // 2-3 specific, actionable items
 *   optimalApproach: string,   // brief note on best solution
 * }
 */

import Anthropic from '@anthropic-ai/sdk';

// ── Prompt builder ────────────────────────────────────────────────────────────
function buildPrompt({ problem, code, reasoning, timeSpent }) {
  const timeNote = timeSpent ? `The candidate spent approximately ${timeSpent} seconds on this problem.` : '';

  return `You are an expert technical interview coach evaluating a candidate's live coding session.

PROBLEM:
Title: ${problem.title}
Category: ${problem.category}
Description: ${problem.description}
Optimal approach: ${problem.optimal_approach}

CANDIDATE'S SUBMISSION:

--- Code ---
${code || '(no code submitted)'}

--- Reasoning / Think-aloud ---
${reasoning || '(no reasoning provided)'}

${timeNote}

EVALUATION RUBRIC — score each dimension 0–10:

1. Problem Clarification (0–10)
   Did the candidate ask or address clarifying questions before coding? Did they identify edge cases and constraints?
   Strong: mentioned constraints, asked about edge cases, confirmed expected output format.
   Weak: jumped straight to coding with no clarification.

2. Complexity Discussion (0–10)
   Did the candidate discuss time and/or space complexity — of their approach and/or alternatives?
   Strong: clearly stated Big-O for their solution; mentioned trade-offs.
   Weak: no mention of complexity at all.

3. Communication Quality (0–10)
   Did the candidate explain their thought process as they went? Was the reasoning coherent and structured?
   Strong: step-by-step explanation, named the algorithm/pattern, explained why.
   Weak: submitted code with no explanation; reasoning is absent or disjointed.

4. Code Correctness (0–10)
   Is the submitted code logically correct? Does it handle the given examples? Are there obvious bugs?
   Strong: correct, handles edge cases, clean.
   Weak: wrong output, missing base cases, syntax errors, or empty.

Return ONLY a valid JSON object — no markdown fences, no extra text — in this exact shape:
{
  "scores": {
    "problemClarification": { "score": <number>, "comments": "<string>" },
    "complexityDiscussion": { "score": <number>, "comments": "<string>" },
    "communicationQuality": { "score": <number>, "comments": "<string>" },
    "codeCorrectness":      { "score": <number>, "comments": "<string>" }
  },
  "overallScore": <number 0-10, average of the four>,
  "summary": "<2-3 sentence overall take>",
  "strengths": ["<point 1>", "<point 2>"],
  "improvements": ["<actionable item 1>", "<actionable item 2>", "<actionable item 3>"]
}`;
}

// ── Anthropic (Claude) provider ──────────────────────────────────────────────
async function callAnthropic(prompt) {
  const { ANTHROPIC_API_KEY } = process.env;
  if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY must be set in .env');

  const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find(b => b.type === 'text');
  return textBlock?.text ?? '';
}

// ── Parse & validate AI response ─────────────────────────────────────────────
function parseResponse(raw) {
  // Strip potential markdown code fences if present
  const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
  const parsed = JSON.parse(cleaned);

  // Compute overallScore if model forgot to include it
  if (typeof parsed.overallScore !== 'number' && parsed.scores) {
    const vals = Object.values(parsed.scores).map(s => s.score ?? 0);
    parsed.overallScore = Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  }

  return parsed;
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function getFeedback({ problem, code, reasoning, timeSpent }) {
  const prompt = buildPrompt({ problem, code, reasoning, timeSpent });
  const raw = await callAnthropic(prompt);
  return parseResponse(raw);
}
