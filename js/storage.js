export const STORAGE_KEY = 'que-yuki-eres:v1';

export function saveQuizState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadQuizState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function clearQuizState() {
  localStorage.removeItem(STORAGE_KEY);
}
