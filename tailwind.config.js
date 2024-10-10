/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Just-In-Time mode per una generazione più veloce delle classi
  darkMode: "class", // Abilitazione della modalità scura tramite classe
  content: [
    "popup.vue",
    "./contents/**/*.vue", // Assicurati di specificare il percorso corretto
    "./src/**/*.{js,ts,jsx,tsx}", // Includi anche file JavaScript e TypeScript se necessario
  ],
  theme: {
    extend: {}, // Qui puoi estendere il tema di default di Tailwind
  },
  plugins: [],
};
