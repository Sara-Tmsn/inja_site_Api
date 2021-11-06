<template>
  <div>
    <!-- {{$store.state.loginDialog}} -->
    <Login />
    <ShoppingCart />
    <router-view/>
  </div>
</template>

<script>
"use strict";
import Login from '../components/Login.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
export default {
  name: "Site",

  components: {
    Login,
    ShoppingCart,
  },

  data: () => ({
    //
  }),
  mounted () {
     let cart = localStorage.getItem('cart');
    // console.log(JSON.parse(cart))
     this.$store.dispatch('updateCartFromLocalStorage', JSON.parse(cart))
  }
};
</script>
<style>
</style>