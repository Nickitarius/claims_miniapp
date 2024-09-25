<script setup lang="ts">
import { onMounted } from 'vue';

const tgUser = window['Telegram'].WebApp.initDataUnsafe.user;

onMounted(() => {});
</script>

<template>
  <v-container>
    <h2>Добрый день, {{ tgUser.first_name }}!</h2>

    <v-btn
      class="d-flex justify-center align-center"
      size="large"
      block
      @click="$router.push({ path: 'short_claims' })"
      >Список заявок</v-btn
    >
  </v-container>
</template>
