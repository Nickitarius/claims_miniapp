<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ClaimsService } from '../services/claims.service';
import { baseStore } from '../stores/base.store';
import { ClaimsUtils } from '../utils/calims.utils';

const store = baseStore();

var claims = ref([]);
var newClaimsNo = ref(0);
var takenWorksNo = ref(0);

onMounted(async () => {
  getAllClaims();
});

function getAllClaims() {
  ClaimsService.getAllClaims(store.tgUser).then((res) => {
    newClaimsNo.value = 0;
    takenWorksNo.value = 0;
    for (let claim of res) {
      claim = ClaimsUtils.adaptClaimFields(claim);
      if (claim.status_id == 10 || claim.status_id == 20) {
        newClaimsNo.value++;
      } else if (claim.status_id == 30) {
        takenWorksNo.value++;
      }
    }
    claims.value = res;
  });
}

getAllClaims();
</script>

<template>
  <v-container>
    <div class="pb-4 pl-4 pr-4">
      <p><b>Общее количество:</b> {{ claims.length }}</p>
      <p><b>Новых:</b> {{ newClaimsNo }}</p>
      <p><b>В работе:</b> {{ takenWorksNo }}</p>
    </div>

    <v-expansion-panels>
      <v-expansion-panel v-for="claim in claims" :key="claim['id']">
        <v-expansion-panel-title>{{ claim['claim_addr'] }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <b>Обращение №: </b>{{ claim['claim_no'] }}<br />
          <b>Статус: </b>{{ claim['status_name'] }}<br />
          <b>Дата: </b>{{ claim['claim_date'] }}<br />
          <b>Договор: </b>{{ claim['client_contract'] }}<br />
          <b>Телефон: </b>{{ claim['claim_phone'] }}<br />
          <b>Имя: </b>{{ claim['client_name'] }}<br />
          <b>Адрес: </b>{{ claim['claim_addr'] }}<br />
          <b>Инициатор: </b>{{ claim['autor'] }}<br />
          <b>Исполнитель: </b>{{ claim['assigned'] }}<br />
          <b>Комментарий к заявке: </b>{{ claim['comment'] }}<br />
          <b>Комментарий к работе: </b>{{ claim['work_commentary'] }}<br />

          <v-btn></v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
