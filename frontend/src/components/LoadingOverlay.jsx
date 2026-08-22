export default function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner" />
        <p>Evaluating your session…</p>
      </div>
    </div>
  );
}
