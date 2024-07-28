<script setup lang="ts">
import {rules} from "@/utils/textValidation";
import {ref} from "vue";
import {useAccountsStore} from "@/stores/accounts";

const accountsStore = useAccountsStore();

const isPasswordVisible = ref<boolean>(false);

const tags = ref<string>('');
const type = ref<string>('');
const login = ref<string>('');
const password = ref<string>('');

const newTags = ref<{text: string}[]>([]);

const handleSubmitTag = () => {
  newTags.value = tags.value.replace(/;\s*$/, '').split(';').map(tag => ({ text: tag.trim() }))
}

const handleSubmit = () => {
  console.log('Submitting form:', { tags: tags.value, type: type.value, login: login.value, password: password.value });

  if (type.value === 'LDAP' && login.value.length >= 1){
    console.log('пуш лдап')
    accountsStore.addNewAccount({
      tags: newTags.value,
      type: type.value,
      login: login.value,
      password: null,
    })
    clearFields();
    accountsStore.additionFlag = !accountsStore.additionFlag;
  } else if (type.value === 'Локальная' && login.value.length >= 1 && password.value.length >= 1) {
    console.log('пуш локал')
    accountsStore.addNewAccount({
      tags: newTags.value,
      type: type.value,
      login: login.value,
      password: password.value,
    })
    clearFields();
    accountsStore.additionFlag = !accountsStore.additionFlag;
  } else {
    return
  }
}

const clearFields = () => {
  tags.value = '';
  type.value = '';
  login.value = '';
  password.value = '';
}
</script>

<template>
  <div class="grid-container pb-2">
    <v-text-field
        v-model="tags"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="50"
        @focusout="handleSubmitTag"
    ></v-text-field>

    <v-select
        v-model="type"
        :items="['LDAP', 'Локальная']"
        class="align-center"
        density="comfortable"
        variant="outlined"
        @focusout="handleSubmit"
    ></v-select>

    <v-text-field
        v-model="login"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(login)]"
        @focusout="handleSubmit"
    ></v-text-field>

    <v-text-field
        :disabled="type === 'LDAP'"
        v-model="password"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(password)]"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
        @focusout="handleSubmit"
    ></v-text-field>
  </div>
</template>

<style scoped>
</style>
