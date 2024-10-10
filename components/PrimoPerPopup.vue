<script setup lang="ts">
import { onMounted, ref } from 'vue';
const cliccato = ref(false)
onMounted(() => {
    console.log("%c Componente caricato", "color: #07f75b");
})
</script>
<template>
    <div class="text-center text-4xl">

        <p>
            ciao sono compoennte per popup
        </p>
        <button @click="cliccato = !cliccato">cambia il click</button>
        <p>il click è {{ cliccato }}</p>
    </div>
</template>