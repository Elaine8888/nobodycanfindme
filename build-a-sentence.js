const params = new URLSearchParams(window.location.search);
let currentIndex = Number(params.get("id")) - 1 || 0;

if (currentIndex < 0) currentIndex = 0;
if (currentIndex >= buildSentenceQuestions.length) currentIndex = 0;

let currentQuestion = null;
let slotsState = [];
let draggedTokenId = null;

const speakerAEl = document.getElementById("speakerA");
const prefixTextEl = document.getElementById("prefixText");
const suffixTextEl = document.getElementById("suffixText");
const slotsContainerEl = document.getElementById("slotsContainer");
const bankEl = document.getElementById("bank");
const resultEl = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion(index) {
  currentQuestion = buildSentenceQuestions[index];
  slotsState = new Array(currentQuestion.answer.length).fill(null);
  resultEl.textContent = "";

  speakerAEl.textContent = currentQuestion.speakerA;
  prefixTextEl.textContent = currentQuestion.speakerBPrefix + " ";
  suffixTextEl.textContent = " " + currentQuestion.speakerBSuffix;

  renderSlots();
  renderBank();
  updateNextButton();
}

function renderSlots() {
  slotsContainerEl.innerHTML = "";

  slotsState.forEach((tokenText, i) => {
    const slot = document.createElement("span");
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
      const token = createToken(tokenText);
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
      const token = createToken(tokenText);
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
    renderSlots();
    renderBank();
  };
}

function createToken(text) {
  const token = document.createElement("span");
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
  renderSlots();
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
    resultEl.textContent = "Please complete the sentence first.";
    return;
  }

  const isCorrect =
    JSON.stringify(slotsState) === JSON.stringify(currentQuestion.answer);

  saveStatus(isCorrect);
  resultEl.textContent = isCorrect ? "Correct!" : "Incorrect.";
});

resetBtn.addEventListener("click", () => {
  slotsState = new Array(currentQuestion.answer.length).fill(null);
  resultEl.textContent = "";
  renderSlots();
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
