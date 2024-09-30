<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ClaimsService } from '../services/claims.service';
import { baseStore } from '../stores/base.store';

const store = baseStore();
const claim = defineModel('claim');
const isShow = defineModel('isShow');

var isShowSnackbar = ref(false);
var snackbarText = ref('');

var commentary = ref('');
var isCommentaryValid = ref(false);
var consumables = ref([]);
var writeOffs = ref(new Array<any>());
var avilableConsumables = ref([]);

function isNotEmptyRule(input: string) {
  if (input.length > 0) {
    return true;
  } else {
    return 'Обязательно напишите комментарий.';
  }
}

async function submitCompleteClaim() {
  if (isCommentaryValid.value) {
    isShow.value = false;
    const res = await ClaimsService.completeClaim(
      claim.value,
      commentary.value,
      writeOffs,
      store.tgUser,
    );

    snackbarText.value = 'Заявка завершена.';

    if (res.status >= 200 && res.status < 300) {
      isShowSnackbar.value = true;
      commentary.value = '';
    }
  }
}

function addWriteoff() {
  writeOffs.value.push({ quantity: 1 });
}

function removeWriteOff(index) {
  writeOffs.value.splice(index, 1);
}

/** Ensures that each consumable can appear on the form only once. */
function changeAvailableConsumables() {
  const writeOffConsumables = writeOffs.value.map((a) => a.consumable);
  const temp = consumables.value.filter((n) => !writeOffConsumables.includes(n));
  avilableConsumables.value = temp;
}

onMounted(async () => {
  consumables.value = await ClaimsService.getConsumables(store.tgUser);
  avilableConsumables.value = consumables.value;
});
</script>

<template>
  <v-container>
    <v-dialog v-model="isShow">
      <v-form @submit.prevent="submitCompleteClaim" v-model="isCommentaryValid">
        <v-card title="Закройте заявку">
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

            <v-divider class="mt-2 mb-2"></v-divider>

            <h3 class="mb-3">Списание расходников</h3>

            <v-row class="mb-n10" v-for="(writeOff, index) in writeOffs" :key="writeOff.consumable">
              <v-col>
                <h5>Расходник</h5>

                <v-autocomplete
                  item-title="name"
                  item-value="id"
                  label="Расходник"
                  density="compact"
                  :items="avilableConsumables"
                  v-model="writeOff.consumable"
                  return-object
                  required
                  :rules="[(v) => !!v || 'Обязательное поле']"
                  @update:modelValue="changeAvailableConsumables()"
                />
              </v-col>

              <v-col>
                <h5>Количество</h5>

                <v-text-field
                  density="compact"
                  controlVariant="stacked"
                  type="number"
                  min="1"
                  v-model="writeOff.quantity"
                ></v-text-field>
              </v-col>

              <v-col cols="1">
                <v-btn
                  @click="removeWriteOff(index)"
                  color="error"
                  icon="$delete"
                  variant="text"
                  class="mt-4"
                />
              </v-col>
            </v-row>

            <v-row v-if="writeOffs.length < 20">
              <v-col><v-btn @click="addWriteoff()">Добавить</v-btn></v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*обязательные поля</small>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Отмена" @click="isShow = false" variant="plain" />

            <v-btn color="primary" text="Сохранить" variant="tonal" type="submit" />
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
