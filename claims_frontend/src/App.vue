<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { BackButton, ClosingConfirmation } from 'vue-tg';
import { useTheme } from 'vuetify';
import { useWebAppTheme } from 'vue-tg';

const { onThemeChanged } = useWebAppTheme();
const vuetifyTheme = useTheme();
function changeTheme() {
  vuetifyTheme.global.name.value = window.Telegram.WebApp.colorScheme;
}
onThemeChanged(changeTheme);

const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;

onMounted(() => {
  changeTheme();
  console.log('GOYDA');
});
</script>

<template>
  <v-app>
    <div><BackButton @click="$router.go(-1)" /></div>

    <v-app-bar>
      <!-- <v-btn>Список заявок</v-btn> -->
      <RouterLink to="/short_claims">Список заявок</RouterLink>
      <!-- <v-app-bar-title>Добрый день, {{ telegramUser.first_name }}</v-app-bar-title> -->

      <!-- <v-spacer></v-spacer> -->

      <!-- <v-btn icon="mdi-dots-vertical">GOYDA</v-btn> -->
    </v-app-bar>

    <!-- <header>
      <h2>Добрый день, {{ user.first_name }}!</h2>
    </header> -->

    <ClosingConfirmation />
  </v-app>

  <RouterView />
</template>
