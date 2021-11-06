<template>
  <v-app-bar fixed flat color="white" short>
    <v-container
      pa-0
      style="max-width: 935px; position: relative; height: 56px; display: flex"
    >
      <shopping-cart />
      <v-row
        no-gutters
        style="position: absolute; width: 56px; height: 56px; top: 0; right: 0"
        justify="center"
        align="center"
      >
        <v-btn v-if="backButton" icon @click="$router.go(-1)">
          <v-icon color="#262626"> mdi-arrow-right </v-icon>
        </v-btn>
      </v-row>
      <v-row v-if="!admin" align="center" class="ma-0 mx-10" justify="center">
        <v-col cols="12" class="pa-0">
          <div class="font-weight-bold text-body-1 my-0" style="text-align: center">
            {{ title }}
          </div>
        </v-col>
      </v-row>
      <v-row v-if="admin" align="center" class="ma-0 mx-14" justify="end">
        <button
          v-if="!editState"
          v-ripple
          class="btn font-weight-medium pa-1 px-3"
          @click="onEditVendor"
        >
          <v-icon color="#262626"> mdi-pencil-outline </v-icon>ویرایش فروشگاه
        </button>
        <button
          v-else
          v-ripple
          class="btn font-weight-medium py-1 px-3"
          @click="saveChanges"
        >
          <v-icon color="#262626"> mdi-checkbox-marked-circle-outline </v-icon
          >ذخیره تغییرات
        </button>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
"use strict";
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
  name: "Header",
  components: {
    ShoppingCart,
  },
  props: ["backButton", "title", "showCart", "admin"],
  data() {
    return {
      editState: false,
    };
  },
  methods: {
    onEditVendor() {
      if (this.admin) {
        this.editState = !this.editState;
        this.$emit("edit-vendor", this.editState);
      }
    },
    saveChanges() {
      if (this.admin) {
        this.editState = !this.editState;
        this.$emit("edit-vendor", this.editState);
      }
    },
  },
};
</script>
<style>
.v-toolbar__content {
  padding: 0 !important;
  border-bottom: 1px solid #dbdbdb !important;
}
.btn {
  border: 1px solid #dbdbdb;
  background-color: white;
  color: #262626;
  font-size: 12px;
  border-radius: 4px;
}
</style>