const params = new URLSearchParams(window.location.search);
let currentIndex = Number(params.get("id")) - 1 || 0;

if (currentIndex < 0) currentIndex = 0;
if (currentIndex >= buildSentenceQuestions.length) currentIndex = 0;

let currentQuestion = null;
let slotsState = [];
let draggedTokenId = null;

const speakerAEl = document.getElementById("speakerA");
const sentenceLineEl = document.getElementById("sentenceLine");
const bankEl = document.getElementById("bank");
const resultEl = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");

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

function loadQuestion(index) {
  currentQuestion = buildSentenceQuestions[index];
  slotsState = new Array(getSlotCount(currentQuestion)).fill(null);
  resultEl.innerHTML = "";

  speakerAEl.textContent = currentQuestion.speakerA;
  renderSentenceLine();
  renderBank();
  updateNextButton();
}

function renderSentenceLine() {
  sentenceLineEl.innerHTML = "";

  let slotIndex = 0;

  currentQuestion.segments.forEach(seg => {
    if (seg.type === "text") {
      const textEl = document.createElement("span");
      textEl.className = "fixed-text";
      textEl.textContent = seg.value;
      sentenceLineEl.appendChild(textEl);
      return;
    }

    const slot = document.createElement("span");
    slot.className = "slot";
    slot.dataset.index = slotIndex;

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
      handleDropToSlot(slotIndex, draggedTokenId);
    });

    const tokenText = slotsState[slotIndex];
    if (tokenText) {
      const shouldCapitalize = isSentenceStartSlot(slotIndex);
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

  const usedTokens = slotsState.filter(Boolean);

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
    removeTokenFromSlots(draggedTokenId);
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

function removeTokenFromSlots(tokenText) {
  const oldIndex = slotsState.indexOf(tokenText);
  if (oldIndex !== -1) {
    slotsState[oldIndex] = null;
  }
}

function handleDropToSlot(slotIndex, tokenText) {
  if (!tokenText) return;

  removeTokenFromSlots(tokenText);

  if (slotsState[slotIndex]) {
    slotsState[slotIndex] = null;
  }

  slotsState[slotIndex] = tokenText;
  renderSentenceLine();
  renderBank();
}

function saveStatus(isCorrect) {
  const status = JSON.parse(localStorage.getItem("bs_status") || "{}");
  status[currentQuestion.id] = isCorrect ? "correct" : "wrong";
  localStorage.setItem("bs_status", JSON.stringify(status));
}

function goToQuestionByIndex(index) {
  const targetId = buildSentenceQuestions[index].id;
  window.location.href = `/build-a-sentence.html?id=${targetId}`;
}

function updateNextButton() {
  if (currentIndex >= buildSentenceQuestions.length - 1) {
    nextBtn.textContent = "Back to Writing";
  } else {
    nextBtn.textContent = "Next";
  }
}

checkBtn.addEventListener("click", () => {
  const isComplete = slotsState.every(item => item !== null);

  if (!isComplete) {
    resultEl.innerHTML = `<div>Please complete the sentence first.</div>`;
    return;
  }

  const isCorrect = isAnswerCorrect(slotsState, currentQuestion.answer);
  saveStatus(isCorrect);

  const fullCorrectSentence = buildFullCorrectSentence(currentQuestion);

  resultEl.innerHTML = `
    <div>${isCorrect ? "✅ Correct!" : "❌ Incorrect."}</div>
    <div>✔ 正确答案：${fullCorrectSentence}</div>
    <div>📘 正确答案翻译：${currentQuestion.translation || ""}</div>
  `;
});

resetBtn.addEventListener("click", () => {
  slotsState = new Array(getSlotCount(currentQuestion)).fill(null);
  resultEl.innerHTML = "";
  renderSentenceLine();
  renderBank();
});

nextBtn.addEventListener("click", () => {
  if (currentIndex >= buildSentenceQuestions.length - 1) {
    window.location.href = "/writing.html";
    return;
  }

  goToQuestionByIndex(currentIndex + 1);
});

loadQuestion(currentIndex);
