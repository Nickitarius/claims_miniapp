<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ClaimsService } from '../services/claims.service';
import { baseStore } from '../stores/base.store';

const store = baseStore();
const route = useRoute();

var isShowSnackbar = ref(false);
var claim = ref({});
var snackbarText = ref('');
var isShowTakeWorkButton = ref(false);
var isShowControlButtons = ref(false);
var isShowCommentaryDialog = ref(false);
var commentary = ref('');
var isCommentaryValid = ref(false);
var currentAction = ref('');

onMounted(async () => {
  claim.value = await ClaimsService.getClaimByClaimNo(route.params.claim_no, store.tgUser);

  if (claim.value['status_id']) {
    isShowTakeWorkButton.value = claim.value['status_id'] == 10 || claim.value['status_id'] == 20;
  } else {
    isShowTakeWorkButton.value = false;
  }

  switch (claim.value['status_id']) {
    case 10:
    case 20:
      isShowTakeWorkButton.value = true;
      isShowControlButtons.value = false;
      break;
    case undefined:
      isShowTakeWorkButton.value = false;
      isShowControlButtons.value = false;
      break;
    default:
      isShowTakeWorkButton.value = false;
      isShowControlButtons.value = true;
  }
});

async function takeWork() {
  const res = await ClaimsService.postTakeWork(claim.value, store.tgUser);
  if (res.status >= 200 && res.status < 300) {
    snackbarText.value = 'Заявка взята в работу.';
    isShowSnackbar.value = true;
  }
  claim.value = await ClaimsService.getClaimByClaimNo(route.params.claim_no, store.tgUser);
}

async function sendDefSMS() {
  const res = await ClaimsService.postSendDefSMS(claim.value, store.tgUser);
  if (res.status >= 200 && res.status < 300) {
    snackbarText.value = 'Смс отправлено.';
    isShowSnackbar.value = true;
  }
  claim.value = await ClaimsService.getClaimByClaimNo(route.params.claim_no, store.tgUser);
}

function addCommentary(action: string) {
  isShowCommentaryDialog.value = true;
  currentAction.value = action;
}

function isNotEmptyRule(input: string) {
  console.log(input.length);
  if (input.length > 0) {
    console.log('Goyim');
    return true;
  } else {
    return 'Обязательно напишите комментарий.';
  }
}

async function submitActionWithCommentary() {
  if (isCommentaryValid.value) {
    isShowCommentaryDialog.value = false;
    let res;
    switch (currentAction.value) {
      case 'addcomment':
        res = await ClaimsService.addComment(claim.value, commentary.value, store.tgUser);
        snackbarText.value = 'Комментарий отправлен.';
        break;
      case 'complete':
        res = await ClaimsService.completeClaim(claim.value, commentary.value, store.tgUser);
        snackbarText.value = 'Заявка завершена.';
        break;
      case 'return':
        res = await ClaimsService.returnClaim(claim.value, commentary.value, store.tgUser);
        snackbarText.value = 'Заявка возвращена.';
        break;
    }

    if (res.status >= 200 && res.status < 300) {
      isShowSnackbar.value = true;
      commentary.value = '';
      currentAction.value = '';
    }
  }
}
</script>

<template>
  <v-container>
    <b>Обращение №: </b>{{ claim['claim_no'] }}<br />
    <b>Статус: </b>{{ claim['status_name'] }}<br />
    <b>Дата: </b>{{ claim['claim_date'] }}<br />
    <b>Договор: </b>{{ claim['client_contract'] }}<br />
    <b>Телефон: </b>
    <a v-bind:href="'tel:' + claim['claim_phone']">{{ claim['claim_phone'] }}</a
    ><br />
    <b>Имя: </b>{{ claim['client_name'] }}<br />
    <b>Адрес: </b>{{ claim['claim_addr'] }}<br />
    <b>Инициатор: </b>{{ claim['autor'] }}<br />
    <b>Исполнитель: </b>{{ claim['assigned'] }}<br />
    <b>Комментарий к заявке: </b>{{ claim['comment'] }}<br />
    <b>Комментарий к работе: </b>{{ claim['work_commentary'] }}<br />

    <div class="ma-3">
      <v-col>
        <div v-if="isShowControlButtons">
          <v-btn class="ma-3" size="large" block color="warning" @click="sendDefSMS()"
            >SMS о недозвоне</v-btn
          >

          <v-btn class="ma-3" size="large" block color="info">Логин и пароль</v-btn>

          <v-btn
            class="ma-3"
            size="large"
            block
            color="secondary"
            @click="addCommentary('addcomment')"
            >Добавить комментарий</v-btn
          >

          <v-btn class="ma-3" size="large" block color="success" @click="addCommentary('complete')"
            >Закрыть заявку</v-btn
          >

          <v-btn class="ma-3" size="large" block color="error" @click="addCommentary('return')"
            >Вернуть заявку</v-btn
          >
        </div>

        <v-btn class="ma-3" size="large" block @click="takeWork()" v-if="isShowTakeWorkButton"
          >В работу</v-btn
        >
        <v-btn
          class="ma-3"
          size="large"
          block
          @click="$router.push({ path: `/claims_list` })"
          variant="outlined"
          >К списку</v-btn
        >
      </v-col>
    </div>

    <v-snackbar v-model="isShowSnackbar" :timeout="6000" color="success">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn variant="outlined" color="grey-lighten-3" @click="isShowSnackbar = false">
          Ок
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="isShowCommentaryDialog" width="auto">
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

            <v-btn text="Отмена" @click="isShowCommentaryDialog = false" variant="plain"></v-btn>

            <v-btn color="primary" text="Сохранить" variant="tonal" type="submit"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>
