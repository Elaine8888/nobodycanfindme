const params = new URLSearchParams(window.location.search);
const setId = Number(params.get("set")) || 1;
const questionId = Number(params.get("id")) || 1;

let currentIndex = buildSentenceQuestions.findIndex(
  q => q.set === setId && q.id === questionId
);

if (currentIndex < 0) currentIndex = 0;

let currentQuestion = null;
let draggedTokenId = null;
let timerId = null;
let timeLeft = 410; // 6:50

const speakerAEl = document.getElementById("speakerA");
const sentenceLineEl = document.getElementById("sentenceLine");
const bankEl = document.getElementById("bank");
const resultEl = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");
const timerEl = document.getElementById("timer");
const examProgressEl = document.getElementById("examProgress");
const finalResultEl = document.getElementById("finalResult");
const questionCardEl = document.getElementById("questionCard");

let currentSetQuestions = [];
let currentSetId = null;
let slotsStateByQuestionId = {};

function normalizeText(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function joinSentenceParts(parts) {
  let sentence = parts
    .filter(part => part !== null && part !== undefined && part !== "")
    .join(" ");
  sentence = sentence.replace(/\s+/g, " ").trim();
  sentence = sentence.replace(/\s+([?.!,;:])/g, "$1");
  return sentence;
}

function buildFullCorrectSentence(question) {
  const answerQueue = [...question.answer];
  const parts = [];

  question.segments.forEach(seg => {
    if (seg.type === "text") {
      parts.push(seg.value);
    } else if (seg.type === "slot") {
      parts.push(answerQueue.shift() || "");
    }
  });

  let sentence = joinSentenceParts(parts);
  if (sentence) {
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  return sentence;
}

function buildUserSentence(question, userSlots) {
  const queue = [...userSlots];
  const parts = [];

  question.segments.forEach(seg => {
    if (seg.type === "text") {
      parts.push(seg.value);
    } else if (seg.type === "slot") {
      parts.push(queue.shift() || "____");
    }
  });

  let sentence = joinSentenceParts(parts);
  if (sentence && sentence !== "____") {
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  return sentence;
}

function isAnswerCorrect(userSlots, correctAnswer) {
  if (!Array.isArray(userSlots) || !Array.isArray(correctAnswer)) return false;
  if (userSlots.length !== correctAnswer.length) return false;

  for (let i = 0; i < userSlots.length; i++) {
    if (normalizeText(userSlots[i]) !== normalizeText(correctAnswer[i])) {
      return false;
    }
  }
  return true;
}

function getSlotCount(question) {
  return question.segments.filter(seg => seg.type === "slot").length;
}

function getCurrentSetQuestions() {
  return buildSentenceQuestions
    .filter(q => q.set === currentSetId)
    .sort((a, b) => a.id - b.id);
}

function getQuestionState(question) {
  if (!slotsStateByQuestionId[question.id]) {
    slotsStateByQuestionId[question.id] = new Array(getSlotCount(question)).fill(null);
  }
  return slotsStateByQuestionId[question.id];
}

function saveCurrentQuestionState() {
  if (!currentQuestion) return;
  const slots = getQuestionState(currentQuestion);
  slotsStateByQuestionId[currentQuestion.id] = [...slots];
}

function loadQuestion(index) {
  currentQuestion = currentSetQuestions[index];
  resultEl.innerHTML = "";
  speakerAEl.textContent = currentQuestion.speakerA;

  renderSentenceLine();
  renderBank();
  updateNav();
}

function renderSentenceLine() {
  sentenceLineEl.innerHTML = "";
  const currentSlots = getQuestionState(currentQuestion);

  let slotIndex = 0;

  currentQuestion.segments.forEach(seg => {
    if (seg.type === "text") {
      const textEl = document.createElement("span");
      textEl.className = "fixed-text";
      textEl.textContent = seg.value;
      sentenceLineEl.appendChild(textEl);
      return;
    }

    const currentSlotIndex = slotIndex;

    const slot = document.createElement("span");
    slot.className = "slot";
    slot.dataset.index = currentSlotIndex;

    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("over");
    });

    slot.addEventListener("dragleave", () => {
      slot.classList.remove("over");
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("over");
      handleDropToSlot(currentSlotIndex, draggedTokenId);
    });

    const tokenText = currentSlots[currentSlotIndex];
    if (tokenText) {
      const shouldCapitalize = isSentenceStartSlot(currentSlotIndex);
      const token = createToken(tokenText, shouldCapitalize);
      slot.appendChild(token);
    }

    sentenceLineEl.appendChild(slot);
    slotIndex++;
  });
}

function isSentenceStartSlot(slotIndex) {
  let count = -1;

  for (const seg of currentQuestion.segments) {
    if (seg.type === "slot") {
      count++;
      if (count === slotIndex) {
        break;
      }
    } else if (seg.type === "text" && normalizeText(seg.value) !== "") {
      return false;
    }
  }

  for (const seg of currentQuestion.segments) {
    if (seg.type === "text" && normalizeText(seg.value) !== "") {
      return false;
    }
    if (seg.type === "slot") {
      return slotIndex === 0;
    }
  }

  return slotIndex === 0;
}

function renderBank() {
  bankEl.innerHTML = "";
  const currentSlots = getQuestionState(currentQuestion);
  const usedTokens = currentSlots.filter(Boolean);

  currentQuestion.bank.forEach((tokenText) => {
    if (!usedTokens.includes(tokenText)) {
      const token = createToken(tokenText, false);
      bankEl.appendChild(token);
    }
  });

  bankEl.ondragover = (e) => {
    e.preventDefault();
  };

  bankEl.ondrop = (e) => {
    e.preventDefault();
    if (!draggedTokenId) return;
    removeTokenFromCurrentQuestion(draggedTokenId);
    renderSentenceLine();
    renderBank();
  };
}

function createToken(text, shouldCapitalize = false) {
  const token = document.createElement("span");
  token.className = "token";

  let displayText = text;
  if (shouldCapitalize && displayText) {
    displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);
  }

  token.textContent = displayText;
  token.draggable = true;
  token.dataset.token = normalizeText(text);

  token.addEventListener("dragstart", () => {
    draggedTokenId = text;
  });

  token.addEventListener("dragend", () => {
    draggedTokenId = null;
  });

  return token;
}

function removeTokenFromCurrentQuestion(tokenText) {
  const currentSlots = getQuestionState(currentQuestion);
  const oldIndex = currentSlots.indexOf(tokenText);
  if (oldIndex !== -1) {
    currentSlots[oldIndex] = null;
  }
}

function handleDropToSlot(slotIndex, tokenText) {
  if (!tokenText) return;

  const currentSlots = getQuestionState(currentQuestion);

  const oldIndex = currentSlots.indexOf(tokenText);
  if (oldIndex !== -1) {
    currentSlots[oldIndex] = null;
  }

  if (currentSlots[slotIndex]) {
    currentSlots[slotIndex] = null;
  }

  currentSlots[slotIndex] = tokenText;
  renderSentenceLine();
  renderBank();
}

function updateNav() {
  const currentPos = currentSetQuestions.findIndex(q => q.id === currentQuestion.id);

  examProgressEl.textContent = `Question ${currentPos + 1} of ${currentSetQuestions.length}`;
  backBtn.disabled = currentPos === 0;
  nextBtn.disabled = currentPos === currentSetQuestions.length - 1;
}

function goToQuestionByPos(pos) {
  if (pos < 0 || pos >= currentSetQuestions.length) return;
  currentIndex = pos;
  loadQuestion(currentIndex);
}

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function startTimer() {
  timerEl.textContent = formatTime(timeLeft);

  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerId);
      submitExam(true);
    }
  }, 1000);
}

function saveSetStatus(results) {
  const status = JSON.parse(localStorage.getItem("bs_status") || "{}");

  results.forEach(item => {
    const key = `${item.question.set}-${item.question.id}`;
    status[key] = item.isCorrect ? "correct" : "wrong";
  });

  localStorage.setItem("bs_status", JSON.stringify(status));
}

function submitExam(isAutoSubmit = false) {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  saveCurrentQuestionState();

  const results = currentSetQuestions.map(question => {
    const userSlots = getQuestionState(question);
    const complete = userSlots.every(x => x !== null);
    const isCorrect = complete && isAnswerCorrect(userSlots, question.answer);

    return {
      question,
      complete,
      isCorrect,
      userSentence: buildUserSentence(question, userSlots),
      correctSentence: buildFullCorrectSentence(question)
    };
  });

  saveSetStatus(results);

  const correctCount = results.filter(r => r.isCorrect).length;
  const total = results.length;
  const accuracy = Math.round((correctCount / total) * 100);

  questionCardEl.style.display = "none";
  bankEl.style.display = "none";
  document.querySelector(".controls").style.display = "none";
  document.querySelector(".exam-topbar").style.display = "none";
  resultEl.innerHTML = "";

  finalResultEl.classList.remove("hidden");
  finalResultEl.innerHTML = `
    <div class="final-score">Score: ${correctCount} / ${total}</div>
    <div class="final-accuracy">
      Accuracy: ${accuracy}%${isAutoSubmit ? " · Time is up, so your set was submitted automatically." : ""}
    </div>

    <div class="review-list">
      ${results.map((item, idx) => `
        <div class="review-item ${item.isCorrect ? "correct" : "wrong"}">
          <div class="review-title">Question ${idx + 1}</div>
          <div class="review-line"><strong>Your answer:</strong> ${item.userSentence}</div>
          <div class="review-line"><strong>Correct answer:</strong> ${item.correctSentence}</div>
          <div class="review-line"><strong>翻译：</strong> ${item.question.translation || ""}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function initSetState() {
  currentSetId = buildSentenceQuestions[currentIndex].set;
  currentSetQuestions = getCurrentSetQuestions();

  currentSetQuestions.forEach(q => {
    if (!slotsStateByQuestionId[q.id]) {
      slotsStateByQuestionId[q.id] = new Array(getSlotCount(q)).fill(null);
    }
  });

  currentIndex = currentSetQuestions.findIndex(q => q.id === questionId);
  if (currentIndex < 0) currentIndex = 0;
}

backBtn.addEventListener("click", () => {
  saveCurrentQuestionState();
  goToQuestionByPos(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  saveCurrentQuestionState();
  goToQuestionByPos(currentIndex + 1);
});

submitBtn.addEventListener("click", () => {
  submitExam(false);
});

resetBtn.addEventListener("click", () => {
  slotsStateByQuestionId[currentQuestion.id] = new Array(getSlotCount(currentQuestion)).fill(null);
  renderSentenceLine();
  renderBank();
  resultEl.innerHTML = "";
});

initSetState();
loadQuestion(currentIndex);
startTimer();
