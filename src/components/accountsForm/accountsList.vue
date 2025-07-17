<script setup lang="ts">
import AccountItem from "@/components/accountsForm/accountItem.vue";
import type {IAccount} from "@/types";
import AccountsHeading from "@/components/accountsForm/accountsHeading.vue";
import {vAutoAnimate} from '@formkit/auto-animate'
import TagsHint from "@/components/accountsForm/tagsHint.vue";

defineProps<{
  accounts: IAccount[];
}>()
</script>

<template>
  <div class="d-flex flex-column ga-2" v-auto-animate>
    <account-item v-for="(account, i) in accounts" :index="i" :account="account" :key="i"/>
  </div>
</template>

<style scoped>

</style>