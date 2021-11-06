
<template>
  <v-container pa-0 style="max-width: 935px">
    <Header
      :admin="true"
      title="سفارشات"
      :showCart="false"
    />
    <v-row no-gutters class="pa-0 mt-14" align="center">
      <v-sheet class="ma-0 pa-0" max-width="100vw">
        <v-tabs v-model="tab" grow color="#262626" slider-size="1" style="position: fixed; top: 56px; z-index: 10; border-bottom: 1px solid #dbdbdb">
          <v-tab
            v-for="item in items"
            :key="item.title"
            class="text-body-2 font-weight-bold"
            >{{ item.title }}
            <v-badge
              v-if="item.title === 'جدید'"
              right
              inline
              :content="2"
              :value="true"
            ></v-badge>
          </v-tab>
        </v-tabs>
      </v-sheet>
    </v-row>
    <v-row no-gutters class="mt-12 mb-16">
      <v-tabs-items v-model="tab" style="width: 100%">
        <v-tab-item>
          <v-row no-gutters>
            <v-col v-for="(order, index) in 2" :key="'order' + index" cols="12">
              <order-card :accepted="false" :sent="false" />
            </v-col>
            <v-row align="center" class="ma-4">
              <v-col cols="3" class="pa-0">
            <p class="ma-0 text-body-2">آماده ارسال</p></v-col>
            <v-col cols="9" class="pa-0">
            <hr
              style="
                height: 1px;
                border-width: 0;
                width: 100%;
                background-color: #262626;
              "
            /></v-col>
            </v-row>
            <v-col v-for="(acceptedorder, index) in 4" :key="'acceptedorder' + index" cols="12">
              <order-card :accepted="true" :sent="false" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row no-gutters>
            <v-col v-for="(sentorder, index) in 4" :key="'sentorder' + index" cols="12">
              <order-card :accepted="false" :sent="true" />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>

<script>
'use strict'
import Header from './Header.vue'
import OrderCard from './OrderCard.vue'
export default {
  name: 'OrdersPage',
  components: {
    Header,
    OrderCard,
  },
  props: [],

  data() {
    return {
      items: [{ title: 'جدید' }, { title: 'ارسال شده' }, { title: 'بایگانی' }],
      scrollOptions: {
        duration: 500,
        offset: 50,
        easing: 'easeInQuad',
      },
      tab: null,
    }
  },
  computed: {},
  created() {},
  methods: {},
}
</script>

<style>
@media screen and (max-width: 734px) {
}
@media screen and (min-width: 735px) {
}
</style>
