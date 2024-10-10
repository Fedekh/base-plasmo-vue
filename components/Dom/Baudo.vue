<script setup lang="ts">
import { onMounted, ref } from 'vue';

// Definisci una variabile reattiva
const message = ref('Benvenuto nel mio componente personalizzato!');

onMounted(() => {
    console.log('Componente BAUDO montato!');
})
</script>


<template>
    <div class="my-custom-component">
        <h2>Questo è un componente personalizzato!</h2>
        <p>{{ message }}</p>
    </div>
</template>