<script setup lang="ts">
import { ref } from 'vue';

// Definisci una variabile reattiva
const message = ref('Benvenuto nel mio componente personalizzato!');
</script>


<template>
    <div class="my-custom-component">
        <h2>Questo è un componente personalizzato!</h2>
        <p>{{ message }}</p>
    </div>
</template>


<style scoped></style>