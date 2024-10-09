<script lang="ts">
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost,
} from "plasmo";
import { ref } from "vue";

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
};

/**
 * Funzione per ottenere un'ancora per il componente inline.
 * Seleziona il pulsante "Scrivi" di Gmail e cambia il suo colore di sfondo.
 * 
 * @returns {Promise<{ element: HTMLElement } | null>} 
 *   Restituisce un oggetto contenente l'elemento del pulsante se trovato,
 *   altrimenti restituisce null.
 */
const getInlineAnchor: PlasmoGetInlineAnchor = (isclicked) => {
  // Seleziona il pulsante "Scrivi"
  const ancorButton = document.querySelector(".T-I.T-I-KE.L3") as HTMLElement;
  if (ancorButton) {
    ancorButton.addEventListener("click", () => {
      // Cambia il valore di isclicked al click
      isclicked.value = !isclicked.value;
    });
    // Cambia il colore di sfondo a viola
    ancorButton.style.backgroundColor = "violet";
    return {
      element: ancorButton,
    };
  }
  return null;
};

/**
 * Monta il componente nello shadow DOM in corrispondenza dell'ancora specificata.
 * Inserisce l'elemento shadowHost subito dopo l'elemento ancorato.
 * 
 * @param {Object} params - Parametri per la funzione.
 * @param {Object} params.anchor - Oggetto che rappresenta l'ancora, deve contenere l'elemento.
 * @param {HTMLElement} params.shadowHost - L'elemento del componente da montare nello shadow DOM.
 */
const mountShadowHost: PlasmoMountShadowHost = ({ anchor, shadowHost }) => {
  if (anchor) {
    console.log("Montando il componente...");
    anchor.element!.insertAdjacentElement('afterend', shadowHost!); // Monta il tuo componente dopo il pulsante
  }
};


export default {
  plasmo: {
    getInlineAnchor,
    mountShadowHost,
  },
  setup() {
    const count = ref(0);
    const isclicked = ref(false);

    getInlineAnchor(isclicked);

    return {
      count,
      isclicked,
    };
  },
  mounted() {
    console.log("Componente montato");
  },
};
</script>

<template>
  <div class="pippo">
    <span style="color: red">{{ count }}</span>
    <p style="color: white">{{ isclicked }}</p>
    <button @click="count++">Many Myths are based on truth</button>
  </div>
</template>


/**
getInlineAnchor è responsabile della selezione dell'elemento nel DOM e della restituzione di informazioni su di esso.

mountShadowHost è responsabile dell'inserimento del tuo template nel DOM utilizzando le informazioni fornite da
getInlineAnchor.
*/