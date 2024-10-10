<script lang="ts">
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost,
} from "plasmo";
import { ref, onMounted } from "vue";
import axios from 'axios';
import cssText from "data-text:~style.css";
import Pippo from "./Pippo.vue";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
};

const getInlineAnchor: PlasmoGetInlineAnchor = (isclicked) => {
  const ancorButton = document.querySelector(".T-I.T-I-KE.L3") as HTMLElement;
  if (ancorButton) {
    ancorButton.addEventListener("click", () => {
      isclicked.value = !isclicked.value;
      console.log("Cliccato! Isclicked:", isclicked.value);
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
    const style = getStyle();
    shadowHost.shadowRoot!.appendChild(style);
    console.log("%c Montando il componente...", "color: #07f75b");
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
        console.log("%c hai cliccato fetch", "color: #07f75b");
      } catch (error) {
        console.error("Errore nella richiesta Axios:", error);
      }
    };

    onMounted(() => {
      getInlineAnchor(isclicked);
      console.log("%c Componente montato", "color: #07f75b");
    });

    return {
      count,
      isclicked,
      fetchData,
    };
  },
};
</script>


<template>
  <div class="pippo my-9 text-3xl">
    <span class="text-white ">{{ count }}</span>
    <p class="">{{ isclicked }}</p>
    <button class="" @click="count++">aumenta counter</button>
    <button class="" @click="fetchData">richiama fetch</button>
    <Pippo />
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