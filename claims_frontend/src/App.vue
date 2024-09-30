<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { BackButton, ClosingConfirmation, useWebAppTheme } from 'vue-tg';
import { useTheme } from 'vuetify';

const { onThemeChanged } = useWebAppTheme();
const vuetifyTheme = useTheme();
function changeTheme() {
  vuetifyTheme.global.name.value = window['Telegram'].WebApp.colorScheme;
}
onThemeChanged(changeTheme);

console.log(import.meta.env.VITE_API_URL);

onMounted(() => {
  changeTheme();
});
</script>

<template>
  <v-app>
    <BackButton @click="$router.go(-1)" />
    <ClosingConfirmation />

    <v-app-bar :elevation="1">
      <v-app-bar-title>{{ $router.currentRoute.value.name }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
