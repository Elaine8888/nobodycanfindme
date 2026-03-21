const STORAGE_KEY = 'toefl_ctw_scores_v1';

let currentIdx = 0;
let timer = null;
let startTime = null;
let currentElapsed = 0;
let scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const practiceGrid = document.getElementById('practice-grid');
const quizTitle = document.getElementById('quiz-title');
const quizKicker = document.getElementById('quiz-kicker');
const quizContent = document.getElementById('quiz-content');
const timerEl = document.getElementById('timer');
const scoreResult = document.getElementById('score-result');
const answerReview = document.getElementById('answer-review');
const answerGrid = document.getElementById('answer-grid');
const feedbackText = document.getElementById('feedback-text');
const timeSpent = document.getElementById('time-spent');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const retryBtn = document.getElementById('retry-btn');

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function getFeedback(score, total) {
  const ratio = score / total;
  if (ratio === 1) return 'Excellent！这一题已经非常稳了。';
  if (ratio >= 0.7) return '很不错，已经有比较稳定的词块提取能力了。';
  if (ratio >= 0.4) return '继续练，注意高频词尾和固定搭配。';
  return '建议先回顾词块，再重新做一遍这题。';
}

function updateStats() {
  const doneCount = Object.keys(scores).length;
  const total = window.quizData.length;
  const totalScore = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const average = doneCount ? (totalScore / doneCount).toFixed(1) : '--';

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-done').textContent = doneCount;
  document.getElementById('stat-average').textContent = doneCount ? `${average}/10` : '--';
}

function renderMenu() {
  practiceGrid.innerHTML = '';

  window.quizData.forEach((quiz, idx) => {
    const score = scores[quiz.id];
    const statusClass = score === undefined ? 'none' : score === quiz.items.length ? 'perfect' : 'done';
    const statusText = score === undefined ? '未开始' : score === quiz.items.length ? '满分' : '已完成';

    const card = document.createElement('article');
    card.className = 'practice-card';
    card.innerHTML = `
      <div class="practice-top">
        <span class="practice-number">${quiz.id}</span>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <h3 class="practice-title">${quiz.title}</h3>
      <div class="card-meta">
        <span>Complete the Words</span>
        <span class="score-badge">最高分 ${score !== undefined ? score : '--'}/${quiz.items.length}</span>
      </div>
      <button class="btn btn-primary" type="button">开始练习</button>
    `;

    card.querySelector('button').addEventListener('click', () => startQuiz(idx));
    practiceGrid.appendChild(card);
  });

  updateStats();
}

function buildQuizHtml(quiz) {
  let html = quiz.template;

  quiz.items.forEach((item, idx) => {
    const len = item.g ?? item.a.length;
    let inputs = `<span class="word-group"><span class="word-prefix">${item.p}</span>`;

    for (let i = 0; i < len; i += 1) {
      inputs += `<input type="text" inputmode="latin" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="1" class="char-input" data-ans-idx="${idx}" />`;
    }

    inputs += `</span>`;
    html = html.replace(`${item.p}{${idx}}`, inputs);
  });

  return html;
}

function setupInputs() {
  const inputs = Array.from(document.querySelectorAll('.char-input'));

  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^a-zA-Z]/g, '').slice(0, 1);
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }

      if (event.key === 'Enter') {
        checkScore();
      }
    });
  });

  if (inputs[0]) inputs[0].focus();
}

function updateTimer() {
  currentElapsed = Math.floor((Date.now() - startTime) / 1000);
  timerEl.textContent = `⏱ ${formatTime(currentElapsed)}`;
}

function startTimer() {
  clearInterval(timer);
  startTime = Date.now();
  currentElapsed = 0;
  timerEl.textContent = '⏱ 00:00';
  timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function startQuiz(idx) {
  currentIdx = idx;
  const quiz = window.quizData[idx];

  homePage.classList.add('hidden');
  quizPage.classList.remove('hidden');
  answerReview.classList.add('hidden');
  nextBtn.classList.add('hidden');
  retryBtn.classList.add('hidden');
  submitBtn.classList.remove('hidden');
  scoreResult.textContent = '';

  quizKicker.textContent = `练习 ${quiz.id} / ${window.quizData.length}`;
  quizTitle.textContent = quiz.title;
  quizContent.innerHTML = buildQuizHtml(quiz);

  setupInputs();
  startTimer();
}

function disableInputs() {
  document.querySelectorAll('.char-input').forEach((input) => {
    input.disabled = true;
  });
}

function enableInputsAndReset() {
  document.querySelectorAll('.char-input').forEach((input) => {
    input.disabled = false;
    input.value = '';
    input.classList.remove('correct', 'wrong');
  });

  answerReview.classList.add('hidden');
  scoreResult.textContent = '';
  retryBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
  submitBtn.classList.remove('hidden');
  answerGrid.innerHTML = '';
  feedbackText.textContent = '';
  timeSpent.textContent = '';
  startTimer();

  const first = document.querySelector('.char-input');
  if (first) first.focus();
}

function checkScore() {
  if (submitBtn.classList.contains('hidden')) return;

  stopTimer();
  const quiz = window.quizData[currentIdx];
  let correctCount = 0;
  answerGrid.innerHTML = '';

  quiz.items.forEach((item, idx) => {
    const inputs = document.querySelectorAll(`.char-input[data-ans-idx="${idx}"]`);
    const user = Array.from(inputs).map((input) => input.value).join('');
    const ok = user.toLowerCase() === item.a.toLowerCase();

    if (ok) correctCount += 1;

    inputs.forEach((input) => {
      input.classList.remove('correct', 'wrong');
      input.classList.add(ok ? 'correct' : 'wrong');
    });

    const itemEl = document.createElement('div');
    itemEl.className = `ans-item ${ok ? 'correct-item' : 'wrong-item'}`;
    itemEl.innerHTML = `
      <div class="answer-label">第 ${idx + 1} 空</div>
      <strong>${item.p}${item.a}</strong>
      <div class="answer-user">你的答案：${user || '（空）'}</div>
    `;
    answerGrid.appendChild(itemEl);
  });

  disableInputs();

  scoreResult.textContent = `得分：${correctCount} / ${quiz.items.length}`;
  feedbackText.textContent = getFeedback(correctCount, quiz.items.length);
  timeSpent.textContent = `用时 ${formatTime(currentElapsed)}`;
  answerReview.classList.remove('hidden');
  submitBtn.classList.add('hidden');
  retryBtn.classList.remove('hidden');

  if (currentIdx < window.quizData.length - 1) {
    nextBtn.classList.remove('hidden');
  }

  if (scores[quiz.id] === undefined || correctCount > scores[quiz.id]) {
    scores[quiz.id] = correctCount;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    renderMenu();
  }
}

function goNext() {
  if (currentIdx < window.quizData.length - 1) {
    startQuiz(currentIdx + 1);
  }
}

function showHome() {
  stopTimer();
  quizPage.classList.add('hidden');
  homePage.classList.remove('hidden');
  renderMenu();
}

function resetProgress() {
  const confirmed = window.confirm('确定要清空本地成绩记录吗？');
  if (!confirmed) return;

  scores = {};
  localStorage.removeItem(STORAGE_KEY);
  renderMenu();
  if (!quizPage.classList.contains('hidden')) {
    showHome();
  }
}

document.getElementById('submit-btn').addEventListener('click', checkScore);
document.getElementById('next-btn').addEventListener('click', goNext);
document.getElementById('back-btn').addEventListener('click', showHome);
document.getElementById('retry-btn').addEventListener('click', enableInputsAndReset);
document.getElementById('reset-progress-btn').addEventListener('click', resetProgress);

renderMenu();
