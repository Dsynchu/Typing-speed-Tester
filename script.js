const quotes = [
  "Practice makes perfect.",
  "Typing speed is essential.",
  "JavaScript is powerful.",
  "Frontend development is fun.",
  "Keep learning every day."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let startTime;
let timerInterval;
let currentQuote = "";

function startGame() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  inputEl.disabled = false; // Enable input again
  timerEl.textContent = "Time: 0s";
  wpmEl.textContent = "WPM: 0";
  accuracyEl.textContent = "Accuracy: 100%";
  clearInterval(timerInterval);
  startTime = null;
}

inputEl.addEventListener("input", () => {
  const text = inputEl.value;

  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
  }

  const elapsedTime = (new Date() - startTime) / 1000 / 60; // minutes
  const wordsTyped = text.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsedTime);
  wpmEl.textContent = isFinite(wpm) ? `WPM: ${wpm}` : "WPM: 0";

  let correctChars = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === currentQuote[i]) correctChars++;
  }
  const accuracy = Math.round((correctChars / text.length) * 100);
  accuracyEl.textContent = text.length ? `Accuracy: ${accuracy}%` : "Accuracy: 100%";

  // ✅ STOP TIMER + ALERT IF COMPLETE
  if (text === currentQuote) {
    clearInterval(timerInterval);
    inputEl.disabled = true;
    alert("🎉 Typing complete!");
  }
});

function updateTimer() {
  const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
  timerEl.textContent = `Time: ${elapsedSeconds}s`;
}

restartBtn.addEventListener("click", startGame);

startGame();
