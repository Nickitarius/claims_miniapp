<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ClosingConfirmation } from 'vue-tg'

onMounted(() => {})
</script>

<template>
  <main>
    <header>
      <!-- <p v-text="dick"></p> -->
    </header>

    <RouterView />
    <!-- <Alert message="SUCK"></Alert> -->

    <ClosingConfirmation />
  </main>
</template>

<style scoped></style>
