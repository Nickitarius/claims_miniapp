import { defineStore } from 'pinia';
import { AxiosConfig } from '../services/axios.config';

export const baseStore = defineStore('baseStore', () => {
  const tgUser = window['Telegram'].WebApp.initDataUnsafe.user;
  const axiosConfig = new AxiosConfig();
  let currentErrorMessage;

  return { tgUser, axiosConfig, currentErrorMessage };
});
