<template>
  <span class="hw-top">
    If I can have honesty, it's easier to overlook mistakes
  </span>
</template>

<script lang="ts">
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}


export default {
  plasmo: {
  },
  setup() { },
  mounted() { }
}
</script>


<style scoped>
.hw-top {
  background: red;
  position: absolute;
  z-index: 1000;
  left: 5%;
  top: 500px;
  color: white;
  font-family: "Fascinate";
}
</style>