let currentIndex = 0;
let currentQuestion = null;
let slotsState = [];
let draggedTokenId = null;

const speakerAEl = document.getElementById("speakerA");
const prefixTextEl = document.getElementById("prefixText");
const suffixTextEl = document.getElementById("suffixText");
const slotsContainerEl = document.getElementById("slotsContainer");
const bankEl = document.getElementById("bank");
const resultEl = document.getElementById("result");

function loadQuestion(index) {
  currentQuestion = buildSentenceQuestions[index];
  slotsState = new Array(currentQuestion.answer.length).fill(null);
  resultEl.textContent = "";

  speakerAEl.textContent = currentQuestion.speakerA;
  prefixTextEl.textContent = currentQuestion.speakerBPrefix + " ";
  suffixTextEl.textContent = " " + currentQuestion.speakerBSuffix;

  renderSlots();
  renderBank();
}

function renderSlots() {
  slotsContainerEl.innerHTML = "";

  slotsState.forEach((tokenText, i) => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = i;

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
      handleDropToSlot(i, draggedTokenId);
    });

    if (tokenText) {
      const token = createToken(tokenText, true);
      slot.appendChild(token);
    }

    slotsContainerEl.appendChild(slot);
  });
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

  bankEl.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  bankEl.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedTokenId) return;
    removeTokenFromSlots(draggedTokenId);
    renderSlots();
    renderBank();
  });
}

function createToken(text, inSlot) {
  const token = document.createElement("div");
  token.className = "token";
  token.textContent = text;
  token.draggable = true;
  token.dataset.token = text;

  token.addEventListener("dragstart", () => {
    draggedTokenId = text;
  });

  token.addEventListener("dragend", () => {
    draggedTokenId = null;
  });

  token.addEventListener("click", () => {
    // 以后可以扩展成手机端“先选词，再点空位”
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
    // 如果这个位置已有词，原词自动回词库
    slotsState[slotIndex] = null;
  }

  slotsState[slotIndex] = tokenText;
  renderSlots();
  renderBank();
}

document.getElementById("checkBtn").addEventListener("click", () => {
  const isComplete = slotsState.every(item => item !== null);

  if (!isComplete) {
    resultEl.textContent = "Please complete the sentence first.";
    return;
  }

  const isCorrect =
    JSON.stringify(slotsState) === JSON.stringify(currentQuestion.answer);

  resultEl.textContent = isCorrect ? "Correct!" : "Incorrect.";
});

document.getElementById("resetBtn").addEventListener("click", () => {
  slotsState = new Array(currentQuestion.answer.length).fill(null);
  resultEl.textContent = "";
  renderSlots();
  renderBank();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % buildSentenceQuestions.length;
  loadQuestion(currentIndex);
});

loadQuestion(currentIndex);
