const challenges = [
  {
    type: "coding",
    label: "Coding",
    title: "Python Output",
    question: "What does this code print?",
    code: `numbers = [2, 4, 6]
print(sum(numbers) / len(numbers))`,
    answer: "It prints 4.0 because the average of 2, 4, and 6 is 4."
  },
  {
    type: "coding",
    label: "Coding",
    title: "Scratch Thinking",
    question: "In Scratch, which block type is usually used to repeat an action multiple times?",
    code: "",
    answer: "A loop block, such as repeat, forever, or repeat until."
  },
  {
    type: "coding",
    label: "Coding",
    title: "Debug Thinking",
    question: "A robot should move 5 steps, but it moves forever. What should students check first?",
    code: `while moving:
    robot.forward()`,
    answer: "They should check the loop condition. The loop may never become false."
  },
  {
    type: "logic",
    label: "Logic",
    title: "Pattern Thinking",
    question: "What comes next in the pattern: 2, 4, 8, 16, ___?",
    code: "",
    answer: "32. Each number is multiplied by 2."
  },
  {
    type: "logic",
    label: "Logic",
    title: "Step-by-Step Thinking",
    question: "A drone moves forward, turns right, moves forward, then turns right again. What skill is this practicing?",
    code: "",
    answer: "Sequencing and directional logic, which are important for coding and robotics."
  },
  {
    type: "ai",
    label: "AI",
    title: "Classification",
    question: "A model predicts whether an email is spam or not spam. What type of machine learning task is this?",
    code: "",
    answer: "Classification, because the model chooses between categories."
  },
  {
    type: "ai",
    label: "AI",
    title: "Dataset Thinking",
    question: "Why should students ask where an AI training dataset came from?",
    code: "",
    answer: "Because the source of the data can affect fairness, accuracy, bias, and reliability."
  },
  {
    type: "beyond-ai",
    label: "Beyond AI",
    title: "Human Judgment",
    question: "If AI gives an answer that sounds confident, what should a student still do?",
    code: "",
    answer: "Check the reasoning, verify the source, compare evidence, and decide whether the answer makes sense."
  },
  {
    type: "beyond-ai",
    label: "Beyond AI",
    title: "Program Design",
    question: "Why is launching a STEM program more than choosing tools?",
    code: "",
    answer: "Because strong programs need goals, curriculum, trained instructors, student support, assessment, communication, and outcomes."
  }
];

const challengeGrid = document.getElementById("challengeGrid");
const filterButtons = document.querySelectorAll("[data-filter]");
let activeFilter = "all";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderChallenges() {
  if (!challengeGrid) return;

  const visibleChallenges =
    activeFilter === "all"
      ? challenges
      : challenges.filter((challenge) => challenge.type === activeFilter);

  challengeGrid.innerHTML = visibleChallenges
    .map((challenge, index) => {
      const codeBlock = challenge.code
        ? `<pre><code>${escapeHtml(challenge.code)}</code></pre>`
        : "";

      return `
        <article class="card challenge-card">
          <span class="tag">${escapeHtml(challenge.label)}</span>
          <h3>${escapeHtml(challenge.title)}</h3>
          <p>${escapeHtml(challenge.question)}</p>
          ${codeBlock}
          <button class="btn secondary answer-btn" type="button" data-answer-index="${index}">
            Reveal Answer
          </button>
          <p class="challenge-answer" hidden>
            ${escapeHtml(challenge.answer)}
          </p>
        </article>
      `;
    })
    .join("");

  challengeGrid.querySelectorAll("[data-answer-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const answerIsHidden = answer.hasAttribute("hidden");

      if (answerIsHidden) {
        answer.removeAttribute("hidden");
        button.textContent = "Hide Answer";
      } else {
        answer.setAttribute("hidden", "");
        button.textContent = "Reveal Answer";
      }
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");
    renderChallenges();
  });
});

const quiz = document.getElementById("quiz");
const quizResult = document.getElementById("quizResult");

if (quiz && quizResult) {
  quiz.querySelectorAll("button[data-correct]").forEach((button) => {
    button.addEventListener("click", () => {
      quiz.querySelectorAll("button[data-correct]").forEach((choice) => {
        choice.classList.remove("correct", "wrong");
      });

      const isCorrect = button.dataset.correct === "true";
      button.classList.add(isCorrect ? "correct" : "wrong");

      quizResult.textContent = isCorrect
        ? "Correct. Goals, age group, budget, timeline, and outcomes should come before buying tools."
        : "Not quite. Tools come after the program goals, age group, budget, timeline, and final outcome.";
    });
  });
}

renderChallenges();
