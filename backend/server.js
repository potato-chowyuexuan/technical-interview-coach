import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { problems } from './problems.js';
import { getFeedback } from './ai.js';

const app = express();
app.use(cors());
app.use(express.json());

// ── GET /api/problems ────────────────────────────────────────────────────────
app.get('/api/problems', (_req, res) => {
  const list = problems.map(({ id, title, difficulty, category }) => ({
    id, title, difficulty, category,
  }));
  res.json(list);
});

// ── GET /api/problems/:id ────────────────────────────────────────────────────
app.get('/api/problems/:id', (req, res) => {
  const problem = problems.find(p => p.id === req.params.id);
  if (!problem) return res.status(404).json({ error: 'Problem not found' });
  res.json(problem);
});

// ── POST /api/feedback ───────────────────────────────────────────────────────
// Body: { problemId, code, reasoning, timeSpent }
app.post('/api/feedback', async (req, res) => {
  const { problemId, code, reasoning, timeSpent } = req.body;
  if (!problemId || !code) {
    return res.status(400).json({ error: 'problemId and code are required' });
  }

  const problem = problems.find(p => p.id === problemId);
  if (!problem) return res.status(404).json({ error: 'Problem not found' });

  try {
    const feedback = await getFeedback({ problem, code, reasoning, timeSpent });
    res.json(feedback);
  } catch (err) {
    console.error('AI feedback error:', err);
    res.status(502).json({ error: 'AI service unavailable. Check your API key and provider config.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Interview Coach API running on http://localhost:${PORT}`));
