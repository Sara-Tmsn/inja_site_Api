
<template>
  <home-page :admin="true" :card-config="{link: 'dashboard'}"/>
</template>

<script>
"use strict";
import HomePage from "../../../../components/HomePage.vue";
export default {
  name: "HomeDashboard",
  components: {
    HomePage,
  },
}
</script>

<style scoped>
</style>
