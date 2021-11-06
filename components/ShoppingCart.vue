<template>
  <v-dialog
    v-model="dialog"
    transition="scale-transition"
    origin="left top"
    max-width="400px"
    width="calc(100vw - 40px)"
    style="position: absolute; top: 20px;"
    content-class="cart-dialog"
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
        <v-badge
          bottom
          overlap
          left
          :content="totalQuantity"
          :value="dialog || 0 === $store.state.cart.length ? false : true"
        >
          <v-icon color="#262626"> mdi-shopping-outline </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card class="pa-4" style="overflow: auto; height: 100%">
      <div class="fill-height">
        <v-row justify="start" no-gutters>
          <v-col cols="1">
            <v-icon color="#262626"> mdi-shopping-outline </v-icon>
          </v-col>
          <v-col cols="4">
            <p class="font-weight-bold body-1">سبد خرید</p>
          </v-col>
          <v-col cols="1">
            <v-btn
              @click="dialog = false"
              icon
              style="position: absolute; top: 10px; left: 10px"
              ><v-icon color="#262626">mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-row
          no-gutters
          align="center"
          class="mt-16"
          v-if="$store.state.cart.length === 0"
        >
          <v-col cols="12">
            <v-row justify="center" class="mb-4">
              <v-icon color="#262626" size="96"> mdi-shopping-outline </v-icon>
            </v-row>
            <v-row justify="center" class="mb-12">
              <h3>سبد خرید شما خالی‌ست!</h3>
            </v-row>
            <v-row class="ma-4 pa-0" align="center" justify="center">
              <v-btn
                color="#0095F6"
                block
                class="mx-4 text-subtitle-2 white--text"
                elevation="0"
                style="padding: 8px"
                >شروع خرید</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
        <div v-else>
          <div v-for="(item, index) in $store.state.cart" :key="index">
            <cart-item
              :item="item"
              :index="index"
              @redirect-to-product="handleItemDirection"
            />
          </div>
          <v-divider class="my-4"></v-divider>
          <v-expansion-panels accordion flat multiple>
            <v-expansion-panel>
              <v-expansion-panel-header
                class="text-body-2 font-weight-bold px-4 py-0"
              >
                کد تخفیف دارید؟
                <v-divider class="mx-2"></v-divider>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    class="text-body-2 font-weight-medium"
                    color="#707070"
                    outlined
                    dense
                    placeholder="کد تخفیف را وارد کنید..."
                  ></v-text-field>
                  <v-btn
                    elevation="0"
                    color="#0095F6"
                    block
                    class="text-subtitle-2 white--text"
                    >اعمال کد تخفیف</v-btn
                  >
                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="mb-4">
              <v-expansion-panel-header
                class="text-body-2 font-weight-bold px-4 py-0"
                >مشخصات گیرنده
                <v-divider class="mx-2"></v-divider>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-col cols="12" class="pa-0">
                  <p class="text-body-2 font-weight-medium">آدرس</p>
                  <v-textarea
                    class="text-body-2 font-weight-medium"
                    color="#707070"
                    outlined
                    dense
                    placeholder="آدرس تحویل گیرنده را وارد کنید..."
                  ></v-textarea>
                  <p class="text-body-2 font-weight-medium">نام تحویل گیرنده</p>
                  <v-text-field
                    class="text-body-2 font-weight-medium"
                    color="#707070"
                    outlined
                    dense
                    placeholder="نام تحویل گیرنده را وارد کنید..."
                  ></v-text-field>
                  <p class="text-body-2 font-weight-medium">
                    شماره تماس تحویل گیرنده
                  </p>
                  <v-text-field
                    class="text-body-2 font-weight-medium"
                    color="#707070"
                    outlined
                    dense
                    placeholder="09123456789"
                  ></v-text-field>
                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider class="mb-4"></v-divider>
          <v-row justify="space-around" class="my-1 mr-4">
            <v-col cols="6" class="py-0"
              ><p class="text-body-2 font-weight-medium text--secondary">
                مجموع خرید:
              </p></v-col
            >
            <v-col cols="6" class="py-0"
              ><h3 class="text-body-1 font-weight-bold">
                {{ totalPrice.toLocaleString()
                }}<span class="text-caption pr-1">تومان</span>
              </h3></v-col
            >
          </v-row>
          <v-row justify="space-around" class="my-1 mr-4">
            <v-col cols="6" class="py-0"
              ><p class="text-body-2 font-weight-medium text--secondary">
                هزینه ارسال :
              </p></v-col
            >
            <v-col cols="6" class="py-0"
              ><h3 class="text-body-2 font-weight-medium">
                به عهده مشتری
              </h3></v-col
            >
          </v-row>
          <v-row justify="space-around" class="my-1 mr-4">
            <v-col cols="6" class="py-0"
              ><p class="text-body-2 font-weight-medium">
                مبلغ قابل پرداخت:
              </p></v-col
            >
            <v-col cols="6" class="py-0"
              ><h3 class="text-body-1 font-weight-bold">
                {{ totalPrice.toLocaleString()
                }}<span class="text-caption pr-1">تومان</span>
              </h3></v-col
            >
          </v-row>
          <v-row class="mx-4 pa-0" align="center" justify="center">
            <v-btn
              color="#0095F6"
              block
              class="mx-4 mb-4 text-subtitle-2 white--text"
              elevation="0"
              style="padding: 8px"
              @click="$router.push({ name: 'Checkout', params: { cart } })"
              >پرداخت</v-btn
            >
          </v-row>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
"use strict";
// import axios from "axios";
import CartItem from "./CartItem.vue";

export default {
  name: "ShoppingCart",
  components: {
    CartItem,
  },
  data() {
    return {
      dialog: false,
    };
  },

  mounted() {},

  // watch: {
  //   drawer(newVal) {
  //     if (newVal) {
  //       document
  //         .getElementsByTagName("html")[0]
  //         .setAttribute("style", "overflow: hidden;");
  //     } else document.getElementsByTagName("html")[0].removeAttribute("style");
  //   },
  // },
  computed: {
    // cart () { return this.$store.state.cart },
    totalPrice() {
      return this.$store.state.cart.reduce(
        (total, item) => total + item.product.product_price * item.qty,
        0
      );
    },
    totalQuantity() {
      return this.$store.state.cart.reduce(
        (total, item) => total + item.qty,
        0
      );
    },
  },
  methods: {
    handleItemDirection(e) {
      this.dialog = e;
    },
  },
};
</script>

<style>
.cart-dialog {
  border-radius: 20px !important;
  background-color: white;
  height: auto;
}
@media screen and (max-width: 600px) {
}

/* .cart-dialog::-webkit-scrollbar {
  width: 10px;
}
.cart-dialog::-webkit-scrollbar-track {
  border-radius: 10px;
}
.cart-dialog::-webkit-scrollbar-thumb {
    border-radius: 10px;
}
.cart-dialog::-webkit-scrollbar-button {
    visibility: hidden;
} */
</style>
