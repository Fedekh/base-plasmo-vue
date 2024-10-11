<template>
  <a href="https://docs.plasmo.com" target="_blank"> View Docs </a>
  <button class="text-4xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="isActive = !isActive">
    clicca
  </button>
  <ComponentForPopup v-if="isActive" />
</template>

<script setup lang="ts">
import "./style.css"
import { ref } from "vue"
import type { App } from "vue"
import ComponentForPopup from "~components/ComponentForPopup.vue"

const isActive = ref(false)

// Opzioni per configurare eventuali plugin
defineOptions({
  prepare(app: App) {
    // Use any plugins here:
    // app.use
  }
})
</script>
