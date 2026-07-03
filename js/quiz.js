import { getJson } from './app.js';
import { saveQuizState, clearQuizState } from './storage.js';

const elements = {
  counter: document.querySelector('#questionCounter'),
  trait: document.querySelector('#questionTrait'),
  text: document.querySelector('#questionText'),
  answers: document.querySelector('#answers'),
  progressBar: document.querySelector('#progressBar'),
  prevBtn: document.querySelector('#prevBtn'),
  nextBtn: document.querySelector('#nextBtn'),
  restartBtn: document.querySelector('#restartBtn')
};

let questions = [];
let currentIndex = 0;
let selections = [];

function renderQuestion() {
  const question = questions[currentIndex];
  const selectedIndex = selections[currentIndex];
  elements.counter.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;
  elements.trait.textContent = question.trait;
  elements.text.textContent = question.text;
  elements.progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  elements.prevBtn.disabled = currentIndex === 0;
  elements.nextBtn.textContent = currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente';
  elements.nextBtn.disabled = selectedIndex === undefined;
  elements.answers.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = `answer ${selectedIndex === index ? 'is-selected' : ''}`;
    button.type = 'button';
    button.innerHTML = `<span>${answer.text}</span>`;
    button.addEventListener('click', () => {
      selections[currentIndex] = index;
      saveQuizState({ selections, currentIndex });
      renderQuestion();
    });
    elements.answers.appendChild(button);
  });
}

function calculateScores() {
  const scores = {
    vainilla: 0,
    fresa: 0,
    limon: 0,
    tamarindo: 0,
    pina: 0,
    uva: 0,
    chicle: 0,
    chamoy: 0
  };

  selections.forEach((answerIndex, questionIndex) => {
    const answer = questions[questionIndex].answers[answerIndex];
    Object.entries(answer.scores).forEach(([flavor, points]) => {
      scores[flavor] += points;
    });
  });

  return scores;
}

function goNext() {
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    saveQuizState({ selections, currentIndex });
    renderQuestion();
    return;
  }

  const scores = calculateScores();
  saveQuizState({ selections, currentIndex, scores, completedAt: new Date().toISOString() });
  window.location.href = 'resultado.html';
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    saveQuizState({ selections, currentIndex });
    renderQuestion();
  }
}

async function init() {
  questions = await getJson('data/questions.json');
  selections = Array(questions.length).fill(undefined);
  renderQuestion();

  elements.nextBtn.addEventListener('click', goNext);
  elements.prevBtn.addEventListener('click', goPrev);
  elements.restartBtn.addEventListener('click', () => {
    clearQuizState();
    currentIndex = 0;
    selections = Array(questions.length).fill(undefined);
    renderQuestion();
  });
}

init().catch(() => {
  elements.text.textContent = 'No se pudieron cargar las preguntas. Abre el proyecto con Live Server.';
});
