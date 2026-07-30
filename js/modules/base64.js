/* CODOXIA - Base64 Encoder / Decoder Interactive Module */

document.addEventListener('DOMContentLoaded', () => {
  const b64Input = document.getElementById('b64Input');
  const b64Output = document.getElementById('b64Output');
  const inputLabel = document.getElementById('inputLabel');
  const outputLabel = document.getElementById('outputLabel');
  const b64Status = document.getElementById('b64Status');
  const btnModeEncode = document.getElementById('btnModeEncode');
  const btnModeDecode = document.getElementById('btnModeDecode');
  const btnCopyB64 = document.getElementById('btnCopyB64');

  if (!b64Input || !b64Output) return;

  let currentMode = 'encode'; // 'encode' | 'decode'

  function processText() {
    const rawValue = b64Input.value;
    if (!rawValue) {
      b64Output.value = '';
      b64Status.textContent = 'READY';
      b64Status.className = 'status-badge status-ok';
      return;
    }

    if (currentMode === 'encode') {
      try {
        // UTF-8 safe Base64 encoding
        const encoded = btoa(encodeURIComponent(rawValue).replace(/%([0-9A-F]{2})/g, (match, p1) => {
          return String.fromCharCode('0x' + p1);
        }));
        b64Output.value = encoded;
        b64Status.textContent = 'ENCODED';
        b64Status.className = 'status-badge status-ok';
      } catch (err) {
        b64Output.value = 'Encoding Error: Invalid character format.';
        b64Status.textContent = 'ERROR';
        b64Status.className = 'status-badge status-err';
      }
    } else {
      try {
        // UTF-8 safe Base64 decoding
        const decoded = decodeURIComponent(atob(rawValue.trim()).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        b64Output.value = decoded;
        b64Status.textContent = 'DECODED';
        b64Status.className = 'status-badge status-ok';
      } catch (err) {
        b64Output.value = 'Decoding Error: Input is not a valid Base64 string.';
        b64Status.textContent = 'INVALID BASE64';
        b64Status.className = 'status-badge status-err';
      }
    }
  }

  // Toggle to Encode Mode
  btnModeEncode.addEventListener('click', () => {
    currentMode = 'encode';
    btnModeEncode.classList.add('active');
    btnModeDecode.classList.remove('active');
    inputLabel.textContent = 'Plain Text Input';
    outputLabel.textContent = 'Base64 Encoded Result';
    processText();
  });

  // Toggle to Decode Mode
  btnModeDecode.addEventListener('click', () => {
    currentMode = 'decode';
    btnModeDecode.classList.add('active');
    btnModeEncode.classList.remove('active');
    inputLabel.textContent = 'Base64 Encoded Input';
    outputLabel.textContent = 'Decoded Plain Text';
    processText();
  });

  // Copy Result
  btnCopyB64.addEventListener('click', () => {
    if (!b64Output.value) return;
    navigator.clipboard.writeText(b64Output.value).then(() => {
      const origText = btnCopyB64.textContent;
      btnCopyB64.textContent = 'Copied!';
      setTimeout(() => {
        btnCopyB64.textContent = origText;
      }, 2000);
    });
  });

  b64Input.addEventListener('input', processText);
});
