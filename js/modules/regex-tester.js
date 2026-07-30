/* CODOXIA - Interactive Regex Evaluator Module */

document.addEventListener('DOMContentLoaded', () => {
  const patternInput = document.getElementById('regexPattern');
  const flagsInput = document.getElementById('regexFlags');
  const testArea = document.getElementById('regexTestString');
  const outputBox = document.getElementById('regexOutput');

  if (!patternInput || !testArea || !outputBox) return;

  function evaluateRegex() {
    const pattern = patternInput.value;
    const flags = flagsInput.value || 'g';
    const text = testArea.value;

    if (!pattern) {
      outputBox.innerHTML = '<span style="color: var(--text-muted);">Enter a regex pattern above to start matching...</span>';
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];

      if (matches.length === 0) {
        outputBox.innerHTML = '<span style="color: var(--accent-rose);">No matches found.</span>';
        return;
      }

      // Highlight matched text
      let highlightedText = '';
      let lastIndex = 0;

      matches.forEach(match => {
        const start = match.index;
        const end = start + match[0].length;
        
        // Escape standard text before match
        highlightedText += escapeHtml(text.substring(lastIndex, start));
        // Wrap matched text in styled tag
        highlightedText += `<mark class="match-highlight">${escapeHtml(match[0])}</mark>`;
        lastIndex = end;
      });

      highlightedText += escapeHtml(text.substring(lastIndex));

      outputBox.innerHTML = `
        <div style="margin-bottom: 12px; color: var(--accent-emerald); font-weight: 600;">
          Found ${matches.length} match${matches.length > 1 ? 'es' : ''}:
        </div>
        <div style="white-space: pre-wrap; line-height: 1.8;">${highlightedText}</div>
      `;
    } catch (err) {
      outputBox.innerHTML = `<span style="color: var(--accent-rose);">Regex Error: ${err.message}</span>`;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  patternInput.addEventListener('input', evaluateRegex);
  flagsInput.addEventListener('input', evaluateRegex);
  testArea.addEventListener('input', evaluateRegex);

  // Initial evaluation
  evaluateRegex();
});
