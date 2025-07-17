<script setup lang="ts">
import AccountItem from "@/components/accountsForm/accountItem.vue";
import type {IAccount} from "@/types";
import AccountsHeading from "@/components/accountsForm/accountsHeading.vue";
import {vAutoAnimate} from '@formkit/auto-animate'

defineProps<{
  accounts: IAccount[];
}>()
</script>

<template>
  <div class="d-flex flex-column ga-2" v-auto-animate>
    <accounts-heading/>
    <account-item v-for="(account, i) in accounts" :index="i" :account="account" :key="i"/>
  </div>
</template>

<style scoped>

</style>