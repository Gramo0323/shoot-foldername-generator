import './style.css';
import { formatFolderName } from './formatter.js';

const dateInput = document.getElementById('date-input');
const idSelect = document.getElementById('identifier-select');
const nameInput = document.getElementById('name-input');
const resultSection = document.getElementById('result-section');
const folderDisplay = document.getElementById('folder-name-display');
const commandDisplay = document.getElementById('command-display');
const copyNameBtn = document.getElementById('copy-name-btn');
const copyCommandBtn = document.getElementById('copy-command-btn');

function updateUI() {
  const date = dateInput.value;
  const id = idSelect.value;
  const name = nameInput.value;

  if (date && name) {
    resultSection.hidden = false;
    const { folderName, copyCommand } = formatFolderName(date, id, name);
    folderDisplay.textContent = folderName;
    commandDisplay.textContent = copyCommand;
  } else {
    resultSection.hidden = true;
  }
}

async function copyToClipboard(text, btnElement, sourceElement) {
  try {
    await navigator.clipboard.writeText(text);
    showFeedback(btnElement, 'コピーしました！');
  } catch (err) {
    console.error('Failed to copy:', err);
    // Fallback: Select the text for manual copy
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(sourceElement);
    selection.removeAllRanges();
    selection.addRange(range);

    showFeedback(btnElement, '選択しました: ⌘Cでコピー');
  }
}

function showFeedback(btn, message) {
  const originalText = btn.textContent;
  btn.textContent = message;
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
  }, 2000);
}

// Event Listeners
[dateInput, idSelect, nameInput].forEach(el => {
  el.addEventListener('input', updateUI);
});

copyNameBtn.addEventListener('click', () => {
  const text = folderDisplay.textContent;
  if (text) copyToClipboard(text, copyNameBtn, folderDisplay);
});

copyCommandBtn.addEventListener('click', () => {
  const text = commandDisplay.textContent;
  if (text) copyToClipboard(text, copyCommandBtn, commandDisplay);
});

// Set default date to today
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
updateUI(); // Trigger initial check (might be empty name though)
