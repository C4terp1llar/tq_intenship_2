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
  <v-btn density="comfortable" icon="mdi-delete" class="mt2" color="red" @click="handleDeleteAccount(index)"></v-btn>
</template>

<style scoped>

</style>