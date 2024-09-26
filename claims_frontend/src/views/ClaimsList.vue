<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ClaimsService } from '../services/claims.service';
import { baseStore } from '../stores/base.store';
import { ClaimsUtils } from '../utils/calims.utils';
import { Paginator } from '../utils/paginator';

const store = baseStore();

var claims = ref([]);
var newClaimsNo = ref(0);
var takenWorksNo = ref(0);
var assignedWorker = ref('-');

var paginator = ref(new Paginator());
function updatePage(pageIdx: number) {
  paginator.value.setPageIdx(pageIdx);
}

function getAllClaims() {
  ClaimsService.getAllClaims(store.tgUser).then((res) => {
    newClaimsNo.value = 0;
    takenWorksNo.value = 0;
    assignedWorker.value = '-';

    for (let claim of res) {
      claim = ClaimsUtils.adaptClaimFields(claim);
      if (claim.status_id == 10 || claim.status_id == 20) {
        newClaimsNo.value++;
      } else if (claim.status_id == 30) {
        takenWorksNo.value++;
      }
      if (assignedWorker.value == '-') {
        assignedWorker.value = claim.assigned;
      }
    }
    claims.value = res;

    paginator.value = new Paginator(res);
  });
}

onMounted(async () => {
  getAllClaims();
});
</script>

<template>
  <v-container>
    <div class="pb-4 pl-4 pr-4">
      <p><b>Общее количество:</b> {{ claims.length }}</p>
      <p><b>Новых:</b> {{ newClaimsNo }}</p>
      <p><b>В работе:</b> {{ takenWorksNo }}</p>
      <br />
      <p><b>Исполнитель:</b> {{ assignedWorker }}</p>
    </div>

    <v-expansion-panels>
      <v-expansion-panel v-for="claim in paginator.getCurrentPage()" :key="claim['id']">
        <v-expansion-panel-title>{{ claim['claim_addr'] }}</v-expansion-panel-title>
        <v-expansion-panel-text>
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

          <div class="pa-3"><v-btn size="large">К заявке</v-btn></div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="pa-6">
      <v-pagination
        :length="paginator.pagesTotal"
        :total-visible="4"
        rounded="circle"
        v-model="paginator.currentPageIdx"
        @update="updatePage"
      ></v-pagination>
    </div>
  </v-container>
</template>
