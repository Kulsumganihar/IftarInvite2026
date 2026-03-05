import React from 'react';

function ResultSummary({ summaryText, onReset }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      const btn = document.getElementById('copyBtn');
      if (btn) {
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.textContent = '📋 Copy as text';
        }, 1800);
      }
    } catch (e) {
      alert('Copy failed. Please select and copy the text manually.');
    }
  };

  return (
    <div className="card" id="result">
      <h3>Your RSVP Submitted</h3>
      <pre id="summaryText">{summaryText}</pre>
      <div className="result-actions">
        <button id="copyBtn" onClick={handleCopy}>📋 Copy as text</button>
        <button onClick={onReset}>✏️ Edit</button>
      </div>
    </div>
  );
}

export default ResultSummary;
