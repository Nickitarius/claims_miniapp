<script lang="ts" setup>
import { ref } from 'vue';
import { ClaimsService } from '../services/claims.service';
import { baseStore } from '../stores/base.store';

const store = baseStore();
const claim = defineModel('claim');
const currentAction = defineModel('currentAction');
const isShow = defineModel('isShow');

var isShowSnackbar = ref(false);
var snackbarText = ref('');
var commentary = ref('');
var isCommentaryValid = ref(false);

function isNotEmptyRule(input: string) {
  if (input.length > 0) {
    return true;
  } else {
    return 'Обязательно напишите комментарий.';
  }
}

async function submitActionWithCommentary() {
  if (isCommentaryValid.value) {
    isShow.value = false;
    let res;
    switch (currentAction.value) {
      case 'addcomment':
        res = await ClaimsService.addComment(claim.value, commentary.value, store.tgUser);
        snackbarText.value = 'Комментарий отправлен.';
        break;
      case 'return':
        res = await ClaimsService.returnClaim(claim.value, commentary.value, store.tgUser);
        snackbarText.value = 'Заявка возвращена.';
        break;
    }

    if (res.status >= 200 && res.status < 300) {
      isShowSnackbar.value = true;
      commentary.value = '';
    }
  }
}
</script>

<template>
  <v-container>
    <v-dialog width="auto" v-model="isShow">
      <v-form @submit.prevent="submitActionWithCommentary" v-model="isCommentaryValid">
        <v-card title="Оставьте комментарий">
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  label="Комментарий*"
                  hint="Ваш комментарий к работе"
                  persistent-hint
                  required
                  :rules="[isNotEmptyRule]"
                  v-model="commentary"
                ></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*обязательные поля</small>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Отмена" @click="isShow = false" variant="plain"></v-btn>

            <v-btn color="primary" text="Сохранить" variant="tonal" type="submit"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-snackbar v-model="isShowSnackbar" :timeout="6000" color="success">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn variant="outlined" color="grey-lighten-3" @click="isShowSnackbar = false">
          Ок
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
