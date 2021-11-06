<template>
  <div class="my-2">
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-card @click="redirectToProduct" elevation="0">
          <v-img
            :src="item.product.contents[0].url"
            aspect-ratio="1"
            width="100%"
          ></v-img>
        </v-card>
      </v-col>
      <v-col class="pa-0">
        <v-row no-gutters>
          <p class="text-body-2 font-weight-medium ma-0 py-1">
            {{ item.product.product_name }}
          </p>
        </v-row>
        <v-row no-gutters>
          <p class="text-body-1 font-weight-bold ma-0 py-1">
            {{ item.product.product_price.toLocaleString()
            }}<span class="text-caption pr-1">تومان</span>
          </p>
        </v-row>
        <v-row align="center" justify="space-around" no-gutters>
          <v-btn icon @click="increaseProductQuantity(index)"
            ><v-icon color="#262626">mdi-plus</v-icon></v-btn
          >
          <p class="text-body-1 font-weight-bold ma-0">
            {{ item.qty }}
          </p>
          <p class="text-body-2 ma-0">عدد</p>
          <v-btn
            icon
            :disabled="item.qty <= 1"
            @click="decreaseProductQuantity(index)"
            ><v-icon color="#262626">mdi-minus</v-icon></v-btn
          >
          <v-btn icon @click="remove(index)"
            ><v-icon color=red >mdi-delete-outline</v-icon></v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
"use strict";

export default {
  name: "CartItem",
  props: ["item", "index"],
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    redirectToProduct() {
      this.dialog = !this.dialog;
      this.$emit("redirect-to-product", this.dialog);
      this.$router.push({
        name: "creator-_id-posts",
        params: { id: this.item.product._id, _id: this.$route.params._id },
        hash: "#id" + this.item.product._id,
      });
    },
    increaseProductQuantity(index) {
      this.$store.commit("setQuantity", {
        index: index,
        qty: this.$store.state.cart[index].qty + 1,
      });
    },
    decreaseProductQuantity(index) {
      this.$store.commit("setQuantity", {
        index: index,
        qty: this.$store.state.cart[index].qty - 1,
      });
    },
    remove(index) {
      this.$store.commit("removeProduct", index);
    },
  },
};
</script>

