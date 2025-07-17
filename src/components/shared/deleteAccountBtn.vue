<script setup lang="ts">
import {useAccountsStore} from "@/stores/accounts";

defineProps<{
  index: number
}>()

const accountsStore = useAccountsStore();

// удаление аккаунта
const handleDeleteAccount = (i: number) => {
  accountsStore.deleteAccount(i)
};
</script>

<template>
  <v-btn density="comfortable" icon="mdi-trash-can-outline" class="mt2" variant="text" color="red" @click="handleDeleteAccount(index)"></v-btn>
</template>

<style scoped>

</style>