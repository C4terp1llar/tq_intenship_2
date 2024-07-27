<script setup lang="ts">
import {rules} from "@/utils/textValidation";
import {ref} from "vue";

const isPasswordVisible = ref<boolean>(false);

const tags = ref<string>('');
const type = ref<string>('');
const login = ref<string>('');
const password = ref<string>('');
</script>

<template>
  <div class="grid-container pb-2">

    <v-text-field
        v-model="tags"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="50"
    ></v-text-field>

    <v-select
        v-model="type"
        :items="['LDAP', 'Локальная']"
        class="align-center"
        density="comfortable"
        variant="outlined"
    ></v-select>

    <v-text-field
        v-model="login"
        class="align-center"
        density="comfortable"
        variant="outlined"
        maxlength="100"
        :rules="[rules.required(login)]"
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
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>