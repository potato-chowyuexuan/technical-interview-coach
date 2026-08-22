import { useState, useEffect, useRef, useCallback } from 'react';
import ProblemList from './components/ProblemList.jsx';
import SessionPane from './components/SessionPane.jsx';
import FeedbackModal from './components/FeedbackModal.jsx';
import LoadingOverlay from './components/LoadingOverlay.jsx';

const API = '/api';

export default function App() {
  const [problems, setProblems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectionNonce, setSelectionNonce] = useState(0);
  const [problem, setProblem] = useState(null);

  // session state
  const [code, setCode] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // async state
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  // load problem list
  useEffect(() => {
    fetch(`${API}/problems`)
      .then(r => r.json())
      .then(setProblems)
      .catch(() => setError('Could not load problems. Is the backend running?'));
  }, []);

  // load individual problem + reset session
  useEffect(() => {
    if (!selectedId) return;
    fetch(`${API}/problems/${selectedId}`)
      .then(r => r.json())
      .then(p => {
        setProblem(p);
        setCode(p.starter_code || '');
        setReasoning('');
        setFeedback(null);
        setError(null);
        setTimeSpent(0);
        setTimerRunning(true);
      })
      .catch(() => setError('Could not load problem details.'));
  }, [selectedId, selectionNonce]);

  // timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimeSpent(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const handleSubmit = useCallback(async () => {
    if (!problem) return;
    setTimerRunning(false);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: problem.id, code, reasoning, timeSpent }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setFeedback(data);
    } catch (e) {
      setError(`Feedback failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [problem, code, reasoning, timeSpent]);

  const handleReset = useCallback(() => {
    if (!problem) return;
    setCode(problem.starter_code || '');
    setReasoning('');
    setFeedback(null);
    setError(null);
    setTimeSpent(0);
    setTimerRunning(true);
  }, [problem]);

  const handleSelectProblem = useCallback((id) => {
    setTimerRunning(false);
    setSelectedId(id);
    setSelectionNonce(n => n + 1);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Technical Interview Coach</h1>
        <span className="badge">IBM Build 2026</span>
      </header>
      <div className="main-content">
        <ProblemList
          problems={problems}
          selectedId={selectedId}
          onSelect={handleSelectProblem}
        />
        <SessionPane
          problem={problem}
          code={code}
          reasoning={reasoning}
          timeSpent={timeSpent}
          timerRunning={timerRunning}
          onCodeChange={setCode}
          onReasoningChange={setReasoning}
          onSubmit={handleSubmit}
          onReset={handleReset}
          loading={loading}
          error={error}
        />
      </div>

      {loading && <LoadingOverlay />}
      {feedback && (
        <FeedbackModal
          feedback={feedback}
          problemTitle={problem?.title}
          onClose={() => { setFeedback(null); setTimerRunning(false); }}
        />
      )}
    </div>
  );
}
