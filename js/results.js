import { getJson, sortScores } from './app.js';
import { loadQuizState } from './storage.js';
import { shareResult } from './share.js';

const resultEmoji = document.querySelector('#resultEmoji');
const resultTitle = document.querySelector('#resultTitle');
const resultSubtitle = document.querySelector('#resultSubtitle');
const resultDescription = document.querySelector('#resultDescription');
const resultTraits = document.querySelector('#resultTraits');
const shareBtn = document.querySelector('#shareBtn');

function renderEmptyState() {
  resultEmoji.textContent = '🍧';
  resultTitle.textContent = 'Aún no hay resultado';
  resultSubtitle.textContent = 'Haz el test para descubrir tu sabor.';
  resultDescription.textContent = '';
  shareBtn.textContent = 'Ir al test';
  shareBtn.addEventListener('click', () => window.location.href = 'test.html');
}

function renderTraits(traits) {
  resultTraits.innerHTML = '';
  traits.forEach((trait) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = trait;
    resultTraits.appendChild(pill);
  });
}

async function init() {
  const state = loadQuizState();
  if (!state?.scores) {
    renderEmptyState();
    return;
  }

  const flavors = await getJson('data/flavors.json');
  const [primaryEntry, secondaryEntry] = sortScores(state.scores);
  const primary = flavors[primaryEntry[0]];
  const secondary = flavors[secondaryEntry[0]];

  resultEmoji.textContent = primary.emoji;
  resultTitle.textContent = `Eres ${primary.name}`;
  resultSubtitle.textContent = `con toque de ${secondary.name}: ${primary.tagline}.`;
  resultDescription.textContent = primary.description;
  renderTraits([...primary.traits, `Toque ${secondary.name}`]);

  shareBtn.addEventListener('click', async () => {
    const text = `Mi resultado en “¿Qué Yuki eres?”: soy ${primary.name} con toque de ${secondary.name} ${primary.emoji}.`;
    try {
      const usedNativeShare = await shareResult(text);
      if (!usedNativeShare) shareBtn.textContent = 'Resultado copiado';
    } catch {
      shareBtn.textContent = 'No se pudo compartir';
    }
  });
}

init().catch(renderEmptyState);
