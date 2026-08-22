# Technical Interview Coach

> IBM Builders Challenge — Wildcard Track (Aug 2026)

A web app that coaches **how** you solve coding problems, not just whether your answer is correct. It evaluates problem clarification, complexity discussion, communication quality, and code correctness — the four dimensions a real interviewer silently judges.

---

## Architecture

```
/
├── backend/          Express API + AI layer
│   ├── server.js     REST endpoints (/api/problems, /api/feedback)
│   ├── problems.js   Curated problem set (8 problems)
│   ├── ai.js         Claude (Anthropic API) integration
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

Open two terminals:

```bash
# Terminal 1 — backend
npm run dev:backend

# Terminal 2 — frontend
npm run dev:frontend
```

Open **http://localhost:5173** in your browser.

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

## Feedback Rubric

Each session is scored across four dimensions (0–10):

| Dimension              | What it measures |
|------------------------|-----------------|
| Problem Clarification  | Did you ask about edge cases and constraints before coding? |
| Complexity Discussion  | Did you state time/space complexity and any trade-offs? |
| Communication Quality  | Did you explain your thought process as you went? |
| Code Correctness       | Is the code logically correct and handling key cases? |

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
