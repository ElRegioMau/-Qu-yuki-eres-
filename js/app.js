export async function getJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
  return response.json();
}

export function sortScores(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}
