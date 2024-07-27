<script setup lang="ts">

import FormBody from "@/components/formBody.vue";
import AppHeading from "@/components/appHeading.vue";
import FormHeading from "@/components/formHeading.vue";
</script>

<template>
  <v-app>
    <v-app-bar>
      <app-heading/>
    </v-app-bar>
    <v-main>
      <form-heading/>
      <form-body/>
    </v-main>
  </v-app>
</template>

<style lang="scss">

</style>
