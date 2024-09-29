<script lang="ts" setup>
import { baseStore } from '../stores/base.store';

const store = baseStore();
const errorText = store.currentErrorMessage;
console.log(errorText);
console.log(store);

async function copyErrorToClipBoard() {
  await navigator.clipboard.writeText(errorText);
}
</script>

<template>
  <v-container>
    <v-sheet border="md" class="pa-6 mx-auto" rounded>
      <h4 class="text-h5 font-weight-bold mb-4">Что-то пошло не так</h4>

      <p>{{ errorText }}</p>

      <p class="mb-8">Обратитесь к администратору</p>

      <v-btn
        class="text-none text-black mb-4"
        color="red-accent-2"
        size="x-large"
        variant="flat"
        block
        @click="$router.push({ path: '/' })"
      >
        На главную
      </v-btn>

      <v-btn
        class="text-none text-black"
        color="red-accent-2"
        size="x-large"
        variant="outlined"
        block
        @click="copyErrorToClipBoard"
      >
        Скопировать ошибку
      </v-btn>
    </v-sheet>
  </v-container>
</template>
