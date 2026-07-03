# ¿Qué Yuki eres?

Sitio web estático para un test de personalidad lúdico basado en sabores tradicionales de yuki: Vainilla, Fresa, Limón, Tamarindo, Piña, Uva, Chicle y Chamoy.

## Autores

- Andrea Crystal de la Rosa de la Cruz
- Roger Waters

## Cómo abrirlo

Recomendado: abrir la carpeta en VS Code y usar la extensión **Live Server** sobre `index.html`.

> Importante: como el proyecto usa `fetch()` para leer archivos JSON, puede fallar si abres `index.html` directamente con doble clic desde `file://`. Usa Live Server o cualquier servidor local.

## Estructura

```text
que-yuki-eres/
├── index.html
├── test.html
├── resultado.html
├── acerca.html
├── css/
├── js/
└── data/
```

## Personalización

- Preguntas: `data/questions.json`
- Sabores y descripciones: `data/flavors.json`
- Estilos principales: `css/themes/pastel.css`
- Lógica del test: `js/quiz.js`
- Resultado y compartir: `js/results.js`
