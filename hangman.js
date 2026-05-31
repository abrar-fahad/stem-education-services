const words = [
  { word: "ROBOTICS", hint: "Building and coding machines that interact with the physical world." },
  { word: "PYTHON", hint: "A beginner-friendly programming language used in coding, AI, data, and automation." },
  { word: "SCRATCH", hint: "A visual coding platform often used by younger learners." },
  { word: "ALGORITHM", hint: "A step-by-step process for solving a problem." },
  { word: "SENSOR", hint: "A device that helps robots detect the world around them." },
  { word: "DATASET", hint: "A collection of data used for analysis or machine learning." },
  { word: "DEBUG", hint: "Finding and fixing errors in code." },
  { word: "CURRICULUM", hint: "A structured learning plan for students." },
  { word: "VARIABLE", hint: "A named storage location in programming." },
  { word: "DRONE", hint: "A flying device that can be programmed for movement and missions." }
];

const wordDisplay = document.getElementById("wordDisplay");
const letterGrid = document.getElementById("letterGrid");
const hint = document.getElementById("hint");
const attemptsText = document.getElementById("attemptsText");
const gameMessage = document.getElementById("gameMessage");
const newWordBtn = document.getElementById("newWordBtn");

let currentWord = null;
let guessedLetters = new Set();
let attempts = 6;

function startGame() {
  if (!wordDisplay || !letterGrid || !hint || !attemptsText || !gameMessage) return;

  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = new Set();
  attempts = 6;

  hint.textContent = `Hint: ${currentWord.hint}`;
  gameMessage.textContent = "";

  renderWord();
  renderLetters();
  updateAttempts();
}

function renderWord() {
  wordDisplay.innerHTML = currentWord.word
    .split("")
    .map((letter) => `<span>${guessedLetters.has(letter) ? letter : "_"}</span>`)
    .join("");

  const playerWon = currentWord.word
    .split("")
    .every((letter) => guessedLetters.has(letter));

  if (playerWon) {
    gameMessage.textContent = "You got it. The machine overlords are mildly impressed.";
    disableLetters();
  }
}

function renderLetters() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  letterGrid.innerHTML = alphabet
    .map((letter) => `<button type="button" data-letter="${letter}">${letter}</button>`)
    .join("");

  letterGrid.querySelectorAll("button[data-letter]").forEach((button) => {
    button.addEventListener("click", () => {
      guessLetter(button.dataset.letter, button);
    });
  });
}

function guessLetter(letter, button) {
  if (guessedLetters.has(letter) || attempts <= 0) return;

  guessedLetters.add(letter);
  button.disabled = true;

  if (!currentWord.word.includes(letter)) {
    attempts -= 1;
  }

  renderWord();
  updateAttempts();

  if (attempts <= 0) {
    gameMessage.textContent = `Game over. The word was ${currentWord.word}. A tragic but educational event.`;
    disableLetters();
  }
}

function updateAttempts() {
  attemptsText.textContent = `Attempts left: ${attempts}`;
}

function disableLetters() {
  letterGrid.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

if (newWordBtn) {
  newWordBtn.addEventListener("click", startGame);
}

startGame();
