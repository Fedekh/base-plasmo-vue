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

// DA CAPIRE PERCHE CI SONO INFINITI RENDERING DOPO if (ancorButton)
const getInlineAnchor: PlasmoGetInlineAnchor = (isclicked) => {
  const ancorButton = document.querySelector(".T-I.T-I-KE.L3") as HTMLElement;
  if (ancorButton) {
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
  <div class="pippo my-9 text-3xl">
    <span class="text-white ">{{ count }}</span>
    <p class="">{{ isclicked }}</p>
    <button class="" @click="count++">aumenta counter</button>
    <button class="" @click="fetchData">richiama fetch</button>
  </div>
</template>


<style scoped>
.pippo {
  background-color: sandybrown;
  position: absolute;
  top: 60px;
  right: -300px;
  width: 250px;
}
</style>

/**
getInlineAnchor è responsabile della selezione dell'elemento nel DOM e della restituzione di informazioni su di esso.

mountShadowHost è responsabile dell'inserimento del tuo template nel DOM utilizzando le informazioni fornite da
getInlineAnchor.
*/