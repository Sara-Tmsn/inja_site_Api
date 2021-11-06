<template>
  <v-dialog
    v-model="dialog"
    width="100vw"
    content-class="menu-dialog"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        height="48"
        width="48"
        style="position: absolute; top: 4px; left: 4px; z-index: 1"
      >
        <v-icon color="#262626"> mdi-dots-vertical </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="tile in tiles"
        :key="tile.routeName"
        @click="dialog = false"
        :to="{
            name: tile.routeName , params: { _id: $route.params._id }}"
      >
        <v-list-item-avatar>
          <v-icon color="#262626">{{ tile.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ tile.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script>
'use strict'
// import axios from "axios";

export default {
  name: 'MenuDialog',
  components: {},
  data() {
    return {
      dialog: false,
      tiles: [
        {
          title: 'اطلاعات حساب کاربری',
          icon: 'mdi-account-outline',
          routeName: 'dashboard-creator-_id-account-profile',
        },
        {
          title: 'اطلاعات ارسال',
          icon: 'mdi-truck-fast-outline',
          routeName: 'dashboard-creator-_id-account-shipping',
        },
        // {
        //   title: 'و یه چیز دیگه',
        //   icon: '',
        //   routeName: 'dashboard-creator-_id-account-smthelse',
        // },
        // {
        //   title: 'و بازم چیز دیگه‌ای',
        //   icon: '',
        //   routeName: 'dashboard-creator-_id-account-emthelseee',
        // },
      ],
    }
  },

  mounted() {},
  computed: {

    },
  methods: {
},
}
</script>

<style>
@media screen and (max-width: 400px) {
  .menu-dialog {
    border-radius: 20px 20px 0 0 !important;
    background-color: white;
    height: auto;
    margin: 0;
    position: absolute;
    bottom: 0;
  }
  .v-dialog.v-list {
    border-radius: 20px 20px 0 0 !important;
  }
}
@media screen and (min-width: 401px) {
  .menu-dialog {
    border-radius: 20px !important;
    background-color: white;
    height: auto;
    max-width: 400px;
  }
  .v-dialog.v-list {
    border-radius: 20px !important;
  }
}
</style>
