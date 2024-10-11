<template>
  <div>
    <h2 class="text-center text-black text-4xl">
      Welcome to your
      <a href="https://www.plasmo.com" target="_blank">Plasmo</a> Extension!
    </h2>

    <div class="container">
      <button @click="decrement">-</button>
      <p>
        <b>{{ state.count }}</b>
      </p>
      <button @click="increment">+</button>
    </div>
  </div>
  <p v-if="state.action" class="action text-center">
    {{ state.action }}
  </p>
  <a href="https://docs.plasmo.com" target="_blank"> View Docs </a>
  <p class="text-4xl" @click="isActive = !isActive">
    fa vedere il componente
  </p>
  <PrimoPerPopup v-if="isActive" />
</template>


<script setup lang="ts">
import "./style.css"
import { reactive, ref } from "vue"
import type { App } from "vue"
import PrimoPerPopup from "~components/ComponentForPopup.vue";
import envText from "data-text-env:~.env";

console.log(envText)

const state = reactive({ count: 0, action: null })
const isActive = ref(false)

function increment() {
  state.count++
  state.action = "increment"
}

function decrement() {
  state.count--
  state.action = "decrement"
}

defineOptions({
  prepare(app: App) {
    // Use any plugins here:
    // app.use
  }
})
</script>


<style>
.container {
  min-width: 470px;
}
</style>