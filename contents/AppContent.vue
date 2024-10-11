<script lang="ts">
import { ref, onMounted } from "vue";
import axios from 'axios';
import envText from "data-text-env:~.env";
import cssText from "data-text:~style.css";
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoMountShadowHost,
} from "plasmo";
import { sendToBackground } from "@plasmohq/messaging";

const isClicked = ref(false);

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"],
};

const handleButtonClick = () => {
  isClicked.value = !isClicked.value;
  console.log("Cliccato! IsClicked:", isClicked.value);
};

/**
 * restituisce un'ancora a cui successivamente mountShadowHost viene applicato
 */
const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  const ancorButton = document.querySelector(".T-I.T-I-KE.L3") as HTMLElement;
  if (ancorButton) {
    ancorButton.style.backgroundColor = "violet";
    ancorButton.style.color = "white";
    ancorButton.removeEventListener("click", handleButtonClick);
    ancorButton.addEventListener("click", handleButtonClick);
    return {
      element: ancorButton,
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

const searchEmail = async () => {
  let anchors = document.querySelectorAll('a[aria-label]');
  let emailPattern = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

  anchors.forEach(a => {
    let ariaLabel = a.getAttribute('aria-label');
    let match = ariaLabel.match(emailPattern);
    if (match) {
      let email = match[0];
      if (email) {
        console.log(`Email trovata: ${email}`);
        localStorage.setItem('email', email);
      } else {
        console.log("Nessuna email trovata");
      }
    }
  });
}

export default {
  plasmo: {
    getInlineAnchor,
    mountShadowHost
  },
  setup() {
    const count = ref(0);
    const fetchData = async () => {
      try {
        const response = await axios.get('https://flynn.boolean.careers/exercises/api/random/name');
        console.log("%c hai cliccato fetch", "color: #07f75b", response.data.response);
      } catch (error) {
        console.error("Errore nella richiesta Axios:", error);
      }
    };

    const observeTitleChange = () => {
      const titleElement = document.querySelector('title');

      if (titleElement) {
        const observer = new MutationObserver((mutations) => { //simile a useEffct di react
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              searchEmail();
              observer.disconnect();
            }
          });
        });

        observer.observe(titleElement, { childList: true });
      } else {
        console.error("L'elemento title non esiste.");
      }
    };

    onMounted(() => {
      getInlineAnchor(isClicked);
      console.log("%c Componente montato", "color: #07f75b");
      observeTitleChange(); // Start observing title changes
    });

    return {
      count,
      isClicked,
      fetchData,
    };
  },
};
</script>


<template>
  <div class="pippo my-9 text-3xl">
    <span class="text-white ">{{ count }}</span>
    <p class="">{{ isClicked }}</p>
    <button class="" @click="count++">aumenta counter</button>
    <button class="" @click="fetchData">richiama fetch</button>
  </div>
</template>


<style scoped>
.pippo {
  background-color: sandybrown;
  position: absolute;
  top: 22rem;
  right: -8rem;
  width: 250px;
}
</style>

/**
getInlineAnchor è responsabile della selezione dell'elemento nel DOM e della restituzione di informazioni su di esso.

mountShadowHost è responsabile dell'inserimento del tuo template nel DOM utilizzando le informazioni fornite da
getInlineAnchor.
*/