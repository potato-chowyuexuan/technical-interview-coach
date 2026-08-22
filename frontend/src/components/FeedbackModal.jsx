function scoreClass(score) {
  if (score >= 7) return 'good';
  if (score >= 4) return 'ok';
  return 'poor';
}

const DIMENSION_LABELS = {
  problemClarification: 'Problem Clarification',
  complexityDiscussion: 'Complexity Discussion',
  communicationQuality: 'Communication Quality',
  codeCorrectness:      'Code Correctness',
};

export default function FeedbackModal({ feedback, problemTitle, onClose }) {
  const cls = scoreClass(feedback.overallScore);

  return (
    <div className="feedback-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="feedback-modal" role="dialog" aria-modal="true">
        <div className="feedback-modal-header">
          <h2>Session Feedback — {problemTitle}</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="feedback-body">
          {/* Overall score */}
          <div className="overall-score">
            <div className={`score-ring ${cls}`}>
              {feedback.overallScore.toFixed(1)}
            </div>
            <div className="overall-text">
              <strong>Overall Score: {feedback.overallScore.toFixed(1)} / 10</strong>
              <p>{feedback.summary}</p>
            </div>
          </div>

          {/* Rubric grid */}
          <div className="rubric-grid">
            {Object.entries(DIMENSION_LABELS).map(([key, label]) => {
              const dim = feedback.scores?.[key];
              if (!dim) return null;
              const dc = scoreClass(dim.score);
              return (
                <div key={key} className="rubric-card">
                  <div className="rubric-card-header">
                    <span className="rubric-card-label">{label}</span>
                    <span className={`score-chip ${dc}`}>{dim.score}/10</span>
                  </div>
                  <div className="score-bar-track">
                    <div
                      className={`score-bar-fill ${dc}`}
                      style={{ width: `${dim.score * 10}%` }}
                    />
                  </div>
                  <p>{dim.comments}</p>
                </div>
              );
            })}
          </div>

          {/* Strengths */}
          {feedback.strengths?.length > 0 && (
            <div className="feedback-section">
              <h3>✓ Strengths</h3>
              <ul className="feedback-list">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="strength-item">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {feedback.improvements?.length > 0 && (
            <div className="feedback-section">
              <h3>↑ Areas to Improve</h3>
              <ul className="feedback-list">
                {feedback.improvements.map((s, i) => (
                  <li key={i} className="improvement-item">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
