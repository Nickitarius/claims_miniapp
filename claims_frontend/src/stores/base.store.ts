import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const baseStore = defineStore('counter', () => {
  const tgUser = window.Telegram.WebApp.initDataUnsafe.user;

  return { tgUser };
});
