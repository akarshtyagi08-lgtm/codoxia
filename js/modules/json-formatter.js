/* CODOXIA - JSON Formatter & Validator Module */

document.addEventListener('DOMContentLoaded', () => {
  const jsonInput = document.getElementById('jsonInput');
  const jsonOutput = document.getElementById('jsonOutput');
  const validationTag = document.getElementById('validationTag');
  const btnPrettify = document.getElementById('btnPrettify');
  const btnMinify = document.getElementById('btnMinify');
  const btnCopy = document.getElementById('btnCopy');

  if (!jsonInput || !jsonOutput) return;

  // Format / Prettify JSON
  btnPrettify.addEventListener('click', () => {
    const rawText = jsonInput.value.trim();
    if (!rawText) return;

    try {
      const parsed = JSON.parse(rawText);
      jsonOutput.value = JSON.stringify(parsed, null, 2);
      validationTag.textContent = 'VALID JSON';
      validationTag.className = 'status-tag status-valid';
    } catch (err) {
      jsonOutput.value = `Syntax Error: ${err.message}`;
      validationTag.textContent = 'INVALID JSON';
      validationTag.className = 'status-tag status-error';
    }
  });

  // Minify JSON
  btnMinify.addEventListener('click', () => {
    const rawText = jsonInput.value.trim();
    if (!rawText) return;

    try {
      const parsed = JSON.parse(rawText);
      jsonOutput.value = JSON.stringify(parsed);
      validationTag.textContent = 'VALID JSON';
      validationTag.className = 'status-tag status-valid';
    } catch (err) {
      jsonOutput.value = `Syntax Error: ${err.message}`;
      validationTag.textContent = 'INVALID JSON';
      validationTag.className = 'status-tag status-error';
    }
  });

  // Copy to Clipboard
  btnCopy.addEventListener('click', () => {
    if (!jsonOutput.value) return;
    navigator.clipboard.writeText(jsonOutput.value).then(() => {
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Copied!';
      setTimeout(() => {
        btnCopy.textContent = originalText;
      }, 2000);
    });
  });
});
