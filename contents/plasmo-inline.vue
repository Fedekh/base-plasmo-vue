<script lang="ts">
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost,
} from "plasmo";
import { ref } from "vue";
import axios from 'axios';
import cssText from "data-text:~style.css"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
};

const getInlineAnchor: PlasmoGetInlineAnchor = (isclicked) => {
  const ancorButton = document.querySelector(".T-I.T-I-KE.L3") as HTMLElement;
  if (ancorButton) {
    console.log(ancorButton);
    ancorButton.addEventListener("click", () => {
      isclicked.value = !isclicked.value;
    });
    ancorButton.style.backgroundColor = "violet";
    return {
      element: ancorButton,
      insertPosition: "beforebegin",
    };
  }
  return null;
};

const mountShadowHost: PlasmoMountShadowHost = ({ anchor, shadowHost }) => {
  if (anchor) {
    // Inietto il CSS nel Shadow DOM
    const style = getStyle();
    shadowHost.shadowRoot!.appendChild(style);

    console.log("Montando il componente...");
    anchor.element!.insertAdjacentElement('afterend', shadowHost!);
  }
};

export default {
  plasmo: {
    getInlineAnchor,
    mountShadowHost
  },
  setup() {
    const count = ref(0);
    const isclicked = ref(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.plasmo.com');
        console.log("hai cliccato fetch");
      } catch (error) {
        console.error("Errore nella richiesta Axios:", error);
      }
    };

    getInlineAnchor(isclicked);

    return {
      count,
      isclicked,
      fetchData,
    };
  },
  mounted() {
    console.log("Componente montato");
  },
};
</script>

<template>
  <div class="pippo my-9 border-amber-100">
    <span class="text-white text-3xl">{{ count }}</span>
    <p class="text-red-500">{{ isclicked }}</p>
    <button class="text-red-600" @click="count++">Many Myths are based on truth</button>
    <button class="text-red-600" @click="fetchData">clicca esplodi</button>
  </div>
</template>


/**
getInlineAnchor è responsabile della selezione dell'elemento nel DOM e della restituzione di informazioni su di esso.

mountShadowHost è responsabile dell'inserimento del tuo template nel DOM utilizzando le informazioni fornite da
getInlineAnchor.
*/