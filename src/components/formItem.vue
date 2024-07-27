<script setup lang="ts">
import { ref} from "vue";
import {rules} from '@/utils/textValidation';
import {useAccountsStore} from "@/stores/accounts";
import {enterTags} from "@/utils/enterTag";
import {enterLogins} from "@/utils/enterLogins";


const accountsStore = useAccountsStore();

const isPasswordVisible = ref<boolean[]>(accountsStore.accountsList.map(() => false)); // массив видимости паролей

const tagsValue = ref<string[]>(enterTags(accountsStore.accountsList)); //использую хелпер, который из массива всех акков делает массив из тегов
const loginsValue = ref<string[]>(enterLogins(accountsStore.accountsList)); //использую хелпер, который из массива всех акков делает массив из логинов

const handleChangeTags = ( i: number, e: any) => {
  let newTagsInput: string = e.target.value; // берем значенеи из инпута

  // удаляем последнюю точку с запятой и пробелы если естьб
  newTagsInput = newTagsInput.replace(/;\s*$/, '');

  if (!newTagsInput.length){
    accountsStore.handleChangeTags([], i); // если тегов нет, ретерним пустой массив чтобы не было [{text: ''}]
    return;
  }

  const newTagsOutput = newTagsInput.split(';').map(tag => ({ text: tag.trim() })); // если теги есть маппимся по массиву, создаем массив вида [{text: ''},{text: ''}]
  accountsStore.handleChangeTags(newTagsOutput, i); // вызываем ф-ию из стора, которая переписывает теги у конкретной записи (отправляем теги и индекс самой записи)
}

const handleChangeType = (i: number) => {
  const newType = accountsStore.getCurrentType(i); // узнаем новый тип после смены на селекте

  if (newType === 'LDAP'){
    accountsStore.handleChangePasswordToNull(i); // если новый тип LDAP тогда делаем пароль в Null иначе ретернимся
  }

  return
}


const handleChangeLogin = (i: number, e: any) => {
  const newLoginInput: string = e.target.value; // берем значенеи из инпута

  if (!newLoginInput.length) return; // если длина нового логина ! то ретернимся и оставляем старый

  accountsStore.handleChangeLogin(i, newLoginInput);// если длина ок - вызываем ф-ию из стора и меняем логин у записи
}
</script>

<template>
  <div class="grid-container pb-2" v-for="(account, i) in accountsStore.accountsList" :key="i">

    <v-text-field
        v-model="tagsValue[i]"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="50"
        @focusout="(e: Event) => handleChangeTags(i, e)"
    ></v-text-field>

    <v-select
        v-model="account.type"
        :items="['LDAP', 'Локальная']"
        class="align-center"
        density="comfortable"
        variant="outlined"
        @update:model-value="handleChangeType(i)"
    ></v-select>

    <v-text-field
        v-model="loginsValue[i]"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(loginsValue[i])]"
        @focusout="(e: Event) => handleChangeLogin(i, e)"
    ></v-text-field>

    <v-text-field
        :disabled="account.type === 'LDAP'"
        v-model="account.password"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(account.password)]"
        :append-inner-icon="isPasswordVisible[i] ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible[i] ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible[i] = !isPasswordVisible[i]"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>