<script setup lang="ts">

import {useAccountsStore} from "@/stores/accounts";

const  accountStore = useAccountsStore()

import FormBody from "@/components/formBody.vue";
import AppHeading from "@/components/appHeading.vue";
import FormHeading from "@/components/formHeading.vue";
import GreetScreen from "@/components/greetScreen.vue";
</script>

<template>
  <v-app>
    <v-app-bar>
      <app-heading/>
    </v-app-bar>
    <v-main v-if="!accountStore.additionFlag && !accountStore.accountsList.length">
      <greet-screen/>
    </v-main>
    <v-main v-else>
      <form-heading/>
      <form-body/>
    </v-main>
  </v-app>
</template>

<style lang="scss">

</style>
