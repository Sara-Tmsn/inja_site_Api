<template>
 <orders-page />
</template>

<script>
"use strict";
import OrdersPage from "../../../../../components/OrdersPage.vue";

export default {
  name: "orders",
  layout: 'dashboard',
  components: {
    OrdersPage
  },
}
</script>

<style scoped>
</style>