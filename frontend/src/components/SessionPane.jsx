import { useState } from 'react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function ProblemDescription({ problem }) {
  return (
    <div className="problem-description">
      <section>
        <h3>Problem</h3>
        <p>{problem.description}</p>
      </section>

      <section>
        <h3>Examples</h3>
        <div className="examples">
          {problem.examples.map((ex, i) => (
            <div key={i} className="example-block">
              <div><strong>Input:</strong> {ex.input}</div>
              <div><strong>Output:</strong> {ex.output}</div>
              {ex.explanation && <div><strong>Note:</strong> {ex.explanation}</div>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Constraints</h3>
        <ul className="constraints-list">
          {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </section>

      <section>
        <h3>💡 Suggested Clarifying Questions</h3>
        <ul className="clarifying-list">
          {problem.clarifying_questions.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </section>
    </div>
  );
}

export default function SessionPane({
  problem,
  code,
  reasoning,
  timeSpent,
  timerRunning,
  onCodeChange,
  onReasoningChange,
  onSubmit,
  onReset,
  loading,
  error,
}) {
  const [activeTab, setActiveTab] = useState('code');

  if (!problem) {
    return (
      <main className="session-pane">
        <div className="empty-state">
          <h2>Technical Interview Coach</h2>
          <p>Select a problem from the left panel to start your session. Think out loud — explain your reasoning as you code.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="session-pane">
      <div className="problem-header">
        <h2>{problem.title}</h2>
        <span className={`timer${timerRunning ? ' running' : ''}`}>
          ⏱ {formatTime(timeSpent)}
        </span>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="workspace">
        <ProblemDescription problem={problem} />

        <div className="editor-pane">
          <div className="pane-tabs">
            <div
              className={`pane-tab${activeTab === 'code' ? ' active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </div>
            <div
              className={`pane-tab${activeTab === 'reasoning' ? ' active' : ''}`}
              onClick={() => setActiveTab('reasoning')}
            >
              Reasoning / Think-aloud
            </div>
          </div>

          <div className="code-editor-wrap">
            {activeTab === 'code' ? (
              <textarea
                className="code-editor"
                value={code}
                onChange={e => onCodeChange(e.target.value)}
                spellCheck={false}
                placeholder="Write your solution here…"
                onKeyDown={e => {
                  // Insert 2-space tab instead of focusing next element
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const { selectionStart, selectionEnd } = e.target;
                    const next = code.slice(0, selectionStart) + '  ' + code.slice(selectionEnd);
                    onCodeChange(next);
                    // Move cursor
                    requestAnimationFrame(() => {
                      e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
                    });
                  }
                }}
              />
            ) : (
              <textarea
                className="reasoning-editor"
                value={reasoning}
                onChange={e => onReasoningChange(e.target.value)}
                placeholder={`Think out loud here. For example:\n\n"I'll start by asking — is the array sorted? I'm going to use a hash map to store…\n\nThe time complexity will be O(n) because…\n\nEdge cases to consider: empty array, all same elements…"`}
              />
            )}
          </div>

          <div className="submit-bar">
            <button
              className="btn-submit"
              onClick={onSubmit}
              disabled={loading || !code.trim()}
            >
              {loading ? 'Evaluating…' : 'Submit for Feedback'}
            </button>
            <button className="btn-reset" onClick={onReset}>Reset</button>
            <span className="submit-hint">
              Fill in both Code and Reasoning for the best feedback
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
