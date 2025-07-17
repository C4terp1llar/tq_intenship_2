<script setup lang="ts">
import {useAccountsStore} from "@/stores/accounts";
import AccountsList from "@/components/accountsForm/accountsList.vue";
import NewAccountItem from "@/components/accountsForm/newAccountItem.vue";
import {vAutoAnimate} from '@formkit/auto-animate'
import GreetScreen from "@/components/shared/greetScreen.vue";
import AccountsHeading from "@/components/accountsForm/accountsHeading.vue";
import TagsHint from "@/components/accountsForm/tagsHint.vue";

const accountsStore = useAccountsStore()

</script>

<template>
  <div class="d-flex flex-column ga-2 accounts" v-auto-animate>
    <template v-if="accountsStore.accountsList.length || accountsStore.additionFlag">
      <tags-hint/>
      <accounts-heading/>
    </template>

    <accounts-list :accounts="accountsStore.accountsList" v-if="accountsStore.accountsList.length"/>
    <new-account-item v-if="accountsStore.additionFlag"/>

    <greet-screen v-if="!accountsStore.additionFlag && !accountsStore.accountsList.length"/>
  </div>
</template>

<style scoped>

</style>