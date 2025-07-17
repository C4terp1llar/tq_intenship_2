<script setup lang="ts">

import AppHeading from "@/components/shared/appHeading.vue";
import Accounts from "@/components/accountsForm/accounts.vue";
</script>

<template>
  <v-app>
    <v-app-bar>
      <app-heading/>
    </v-app-bar>
    <v-main>
      <accounts/>
    </v-main>
  </v-app>
</template>

<style lang="scss">

</style>
