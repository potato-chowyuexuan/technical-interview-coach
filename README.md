# Technical Interview Coach

> IBM AI Builders Challenge — Wild Card Challenge (Aug 2026)

A web app that coaches **how** you solve coding problems, not just whether your answer is correct. It evaluates problem clarification, complexity discussion, communication quality, and code correctness — the four dimensions a real interviewer silently judges.

---

## Problem Statement

Existing interview-prep tools (e.g. VMock) cover resumes and general/behavioral mock interviews, but none coach the live technical coding interview itself — the process of problem-solving under pressure, not just whether the final answer is correct. Candidates get plenty of practice writing correct code, but almost no structured feedback on the *process* skills that interviewers actually weigh: do they clarify the problem first? Do they reason about complexity out loud? Do they communicate their thinking, or go silent and just type?

## Solution

Technical Interview Coach gives candidates a live coding workspace — a curated problem, a code editor, and a "think out loud" reasoning pane — then acts as an AI interview coach: after submission, it evaluates the full session (code *and* reasoning) against the same four dimensions a human interviewer silently scores, and returns structured, actionable feedback instead of a pass/fail correctness check.

This is an AI collaborator in the "future of work" sense the challenge describes: it doesn't just execute a task (grade code), it augments a person's ability to make a high-stakes decision-adjacent skill — landing a job — better and faster, by giving them the kind of structured, expert-level feedback that would otherwise require a human mock-interviewer.

## Selected Challenge Theme

**Wild Card Challenge.** The idea — coaching the *process* of a live technical interview, not just checking correctness — didn't fit either monthly theme, so it's submitted as a Wild Card entry. It still centers the theme's core premise: AI as a collaborator that helps an individual achieve a better outcome (here, interview performance and ultimately a job offer) through structured feedback and decision support, rather than just automating a task end-to-end.

## AI Approach & Architecture

On submission, the backend sends the candidate's code, their reasoning transcript, and the problem's official approach to **Claude (Haiku 4.5, via the Anthropic API)** with a structured rubric prompt. The model scores four dimensions (0–10 each) and returns a strict JSON payload — no free-form grading — which the frontend renders as a scorecard with per-dimension comments, strengths, and concrete improvements. Grading logic (the rubric prompt) lives entirely in [`backend/ai.js`](backend/ai.js); the API key is used server-side only, so it's never exposed to the browser.

```
/
├── backend/          Express API + AI layer
│   ├── server.js     REST endpoints (/api/problems, /api/feedback)
│   ├── problems.js   Curated problem set (8 problems)
│   ├── ai.js         Claude (Anthropic API) integration — rubric prompt + grading
│   └── .env.example  Config template
└── frontend/         React + Vite
    └── src/
        ├── App.jsx              Root state & orchestration
        └── components/
            ├── ProblemList.jsx  Sidebar problem selector
            ├── SessionPane.jsx  Code editor + reasoning input
            ├── FeedbackModal.jsx  Structured results display
            └── LoadingOverlay.jsx
```

### Feedback Rubric

Each session is scored across four dimensions (0–10):

| Dimension              | What it measures |
|------------------------|-----------------|
| Problem Clarification  | Did you ask about edge cases and constraints before coding? |
| Complexity Discussion  | Did you state time/space complexity and any trade-offs? |
| Communication Quality  | Did you explain your thought process as you went? |
| Code Correctness       | Is the code logically correct and handling key cases? |

## How IBM Bob Was Used

IBM Bob scaffolded the initial project end-to-end — the Express backend structure, the React/Vite frontend, and the first draft of this README. That scaffold was then refined and extended (feature fixes, the Claude/Anthropic AI integration, UX bug fixes, and this documentation pass).

---

## Setup

### 1. Clone & install

```bash
npm run install:all
```

### 2. Configure Claude API key

```bash
cp backend/.env.example backend/.env
# edit backend/.env with your Anthropic API key
```

```
ANTHROPIC_API_KEY=<your Anthropic API key>
```

Get a key from [console.anthropic.com](https://console.anthropic.com).

### 3. Run

```bash
npm run dev
```

Runs both the backend and frontend together (color-coded output per process). Open **http://localhost:5173** in your browser.

<details>
<summary>Run them separately instead</summary>

```bash
# Terminal 1 — backend
npm run dev:backend

# Terminal 2 — frontend
npm run dev:frontend
```
</details>

---

## Problem Set (8 problems)

| Title                | Difficulty | Category                      |
|----------------------|------------|-------------------------------|
| Two Sum              | Easy       | Arrays / Hash Maps            |
| Valid Parentheses    | Easy       | Stacks / Strings              |
| Binary Search        | Easy       | Binary Search                 |
| Climbing Stairs      | Easy       | Dynamic Programming           |
| Reverse Linked List  | Easy       | Linked Lists                  |
| Merge Intervals      | Medium     | Arrays / Sorting              |
| LRU Cache            | Medium     | Design / Hash Maps            |
| Word Search          | Medium     | Backtracking / Graphs         |

---

## API Reference

`GET /api/problems` — list all problems (id, title, difficulty, category)

`GET /api/problems/:id` — full problem detail

`POST /api/feedback` — evaluate a session
```json
{
  "problemId": "two-sum",
  "code": "function twoSum(nums, target) { … }",
  "reasoning": "I'll use a hash map to track complements…",
  "timeSpent": 840
}
```
