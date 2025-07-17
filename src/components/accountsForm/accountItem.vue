<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {rules} from '@/utils/textValidation';
import {useAccountsStore} from "@/stores/accounts";
import DeleteAccountBtn from "@/components/shared/deleteAccountBtn.vue";
import type {IAccount} from "@/types";
import {vAutoAnimate} from '@formkit/auto-animate';

const accountsStore = useAccountsStore();

const props = defineProps<{
  account: IAccount,
  index: number
}>()

const isPasswordVisible = ref<boolean>(false);

const tagsValue = computed(() => {
  let tagsArr: string[] = [];

  const tagTexts = props.account.tags.map((tag) => tag.text).join("; ");
  tagsArr.push(tagTexts);

  return tagsArr;
})

const handleChangeTags = (i: number, e: any) => {
  let newTagsInput: string = e.target.value; // берем значенеи из инпута

  // удаляем последнюю точку с запятой и пробелы если естьб
  newTagsInput = newTagsInput.replace(/;\s*$/, '');

  if (!newTagsInput.length) {
    accountsStore.handleChangeTags([], i); // если тегов нет, ретерним пустой массив чтобы не было [{text: ''}]
    return;
  }

  const newTagsOutput = newTagsInput.split(';').map(tag => ({text: tag.trim()})); // если теги есть маппимся по массиву, создаем массив вида [{text: ''},{text: ''}]
  accountsStore.handleChangeTags(newTagsOutput, i); // вызываем ф-ию из стора, которая переписывает теги у конкретной записи (отправляем теги и индекс самой записи)
}

const handleChangeType = (i: number) => {
  const newType = accountsStore.getCurrentType(i); // узнаем новый тип после смены на селекте

  if (newType === 'LDAP') {
    accountsStore.handleChangePasswordToNull(i); // если новый тип LDAP тогда делаем пароль в Null иначе ретернимся
  }

  return
}

const handleChangeLogin = (i: number, e: any) => {
  const newLoginInput: string = e.target.value; // берем значенеи из инпута

  if (!newLoginInput.length) return; // если длина нового логина ! то ретернимся и оставляем старый

  accountsStore.handleChangeLogin(i, newLoginInput);// если длина ок - вызываем ф-ию из стора и меняем логин у записи
}

const handleChangePassword = (i: number, e: any) => {
  const newPassInput: string = e.target.value; // берем значенеи из инпута

  if (!newPassInput.length) return; // если длина нового пароля ! то ретернимся и оставляем старый

  accountsStore.handleChangePassword(i, newPassInput);// если длина ок - вызываем ф-ию из стора и меняем пароль у записи
}


const formRef = ref<HTMLElement | null>(null);

const check = () => {
  if (props.account.type === 'Локальная' && !props.account.password) {
    accountsStore.handleChangeType('LDAP', props.index);
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // если клик внутри формы
  if (formRef.value && formRef.value.contains(target)) return;
  // костыли реализации компонент vuetify
  if (target.closest('.v-overlay, .v-menu, .v-list, .v-select, .v-autocomplete')) return;

  // если точно вне формы
  check();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <v-form ref="formRef" class="accounts__item" v-auto-animate>
    <v-text-field
        v-model="tagsValue"
        class="align-center"
        density="compact"
        variant="outlined"
        maxlength="50"
        @blur="(e: Event) => handleChangeTags(index, e)"
    ></v-text-field>

    <v-select
        v-model="account.type"
        :items="['LDAP', 'Локальная']"
        class="align-center"
        density="compact"
        variant="outlined"
        @update:model-value="handleChangeType(index)"
    ></v-select>

    <v-text-field
        v-model="account.login"
        :class="['align-center', {'grid-span-2': account.type === 'LDAP'}]"
        density="compact"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(account.login)]"
        @focusout="(e: Event) => handleChangeLogin(index, e)"
    ></v-text-field>

    <v-text-field
        v-if="account.type !== 'LDAP'"
        :disabled="account.type === 'LDAP'"
        v-model="account.password"
        class="align-center"
        density="compact"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(account.password)]"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
        @focusout="(e: Event) => handleChangePassword(index, e)"
    ></v-text-field>

    <delete-account-btn :index="index"/>
  </v-form>
</template>

<style scoped>

</style>