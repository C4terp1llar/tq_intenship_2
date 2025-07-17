<script setup lang="ts">
import {useAccountsStore} from "@/stores/accounts";

const accountsStore = useAccountsStore();
const handleClick = () => {
  accountsStore.additionFlag = !accountsStore.additionFlag;
}
</script>

<template>
  <v-container class="d-flex justify-space-between w-100 align-center">
    <h1>
      Учетные записи
    </h1>

    <v-btn
        icon="mdi-plus"
        :disabled="accountsStore.additionFlag"
        color="primary"
        variant="outlined"
        @click="handleClick"
    />
  </v-container>
</template>

<style scoped>

</style>