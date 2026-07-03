export async function shareResult(text) {
  if (navigator.share) {
    await navigator.share({ title: '¿Qué Yuki eres?', text, url: window.location.origin + window.location.pathname.replace('resultado.html', 'index.html') });
    return true;
  }

  await navigator.clipboard.writeText(text);
  return false;
}
