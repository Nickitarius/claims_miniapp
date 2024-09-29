<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ClaimsService } from '../services/claims.service';
import { baseStore } from '../stores/base.store';

const store = baseStore();
const route = useRoute();

var snackbar = ref(false);
var claim = ref(Object);
var text = ref('');

onMounted(async () => {
  claim.value = await ClaimsService.getClaimByClaimNo(route.params.claim_no, store.tgUser);
});

async function takeWork() {
  const res = await ClaimsService.postTakeWork(claim.value, store.tgUser);
  // .then((res) => {
  //   console.log(res);
  // });
  if (res.status >= 200 && res.status < 300) {
    console.log('GOYDA');
    text.value = 'Заявка взята в работу.';
    snackbar.value = true;
  }
  claim.value = await ClaimsService.getClaimByClaimNo(route.params.claim_no, store.tgUser);
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

    <div class="pa-3">
      <v-col>
        <v-btn class="ma-3" size="large" block @click="takeWork()">В работу</v-btn>
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

    <v-snackbar v-model="snackbar" :timeout="5000" color="success">
      {{ text }}

      <template v-slot:actions>
        <v-btn variant="outlined" color="grey-lighten-3" @click="snackbar = false"> Ок </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
