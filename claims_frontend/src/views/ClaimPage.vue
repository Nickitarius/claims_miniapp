<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CommentDialog from '../components/CommentDialog.vue';
import CompleteClaimDialog from '../components/CompleteClaimDialog.vue';
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
var isShowCompleteClaimDialog = ref(false);
var currentAction = ref('');
var accounts = ref();

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

async function closeClaim() {
  isShowCompleteClaimDialog.value = true;
}

async function getAccounts() {
  accounts.value = await ClaimsService.getAccounts(claim.value, store.tgUser);
}
</script>

<template>
  <v-container>
    <v-sheet border="md" class="pa-6 mx-auto" rounded>
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

      <v-expansion-panels class="my-1 mt-3" v-if="accounts">
        <v-expansion-panel title="Логины и пароли">
          <v-expansion-panel-text>
            <div v-for="(account, index) in accounts" :key="index">
              <b>Аккаунт код:</b> {{ account.account_code }} <br />
              <b>Статус:</b> {{ account.status_name }}<br />
              <b>Тарифный план:</b> {{ account.tarplan_name }}<br />
              <b>Логин:</b> {{ account.login }}<br />
              <b>Пароль:</b> {{ account.password }}<br />
              <v-divider v-if="index < accounts.length - 1" class="mb-2 mt-2"></v-divider>
            </div>
          </v-expansion-panel-text> </v-expansion-panel
      ></v-expansion-panels>
    </v-sheet>

    <div class="my-3">
      <v-col>
        <div v-if="isShowControlButtons">
          <v-btn class="my-3" size="large" block color="warning" @click="sendDefSMS()"
            >SMS о недозвоне</v-btn
          >

          <v-btn class="my-3" size="large" block color="info" @click="getAccounts()"
            >Логин и пароль</v-btn
          >

          <v-btn
            class="my-3"
            size="large"
            block
            color="secondary"
            @click="addCommentary('addcomment')"
            >Добавить комментарий</v-btn
          >

          <v-btn class="my-3" size="large" block color="success" @click="closeClaim()"
            >Закрыть заявку</v-btn
          >

          <v-btn class="my-3" size="large" block color="error" @click="addCommentary('return')"
            >Вернуть заявку</v-btn
          >
        </div>

        <v-btn class="my-3" size="large" block @click="takeWork()" v-if="isShowTakeWorkButton"
          >В работу</v-btn
        >
        <v-btn
          class="my-3"
          size="large"
          block
          @click="$router.push({ path: `/claims_list` })"
          variant="outlined"
          >К списку</v-btn
        >
      </v-col>
    </div>

    <comment-dialog
      v-model:isShow="isShowCommentaryDialog"
      v-model:claim="claim"
      v-model:currentAction="currentAction"
    />

    <complete-claim-dialog v-model:isShow="isShowCompleteClaimDialog" v-model:claim="claim" />

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
