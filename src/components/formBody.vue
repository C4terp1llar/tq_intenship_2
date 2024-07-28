<script setup lang="ts">
import {useAccountsStore} from "@/stores/accounts";

const accountsStore = useAccountsStore();

import FormItem from "@/components/formItem.vue";
import NewFormItem from "@/components/newFormItem.vue";
</script>

<template>
  <v-form>
    <form-item/>
    <new-form-item v-if="accountsStore.additionFlag"/>
  </v-form>
</template>

<style scoped>

</style>