<script setup lang="ts">
import { ClaimsService } from '@/services/claims.service';
import { onMounted } from 'vue';

function getAllClaims() {
  const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
  console.log(ClaimsService.getAllClaims(telegramUser));
}

onMounted(() => {
  console.log('Mount');
  getAllClaims();
});

// export default
</script>

<template>
  <!-- <v-container> -->
  <v-btn @click="getAllClaims">Получить заявки</v-btn>
  <!-- </v-container> -->
</template>
