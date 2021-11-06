
<template>
  <v-container style="max-width: 935px">
    <Header
      :backButton="true"
      :admin="true"
      @edit-vendor="handleEditVendor"
    />
    <v-row align="center" class="mt-11">
        <v-col
          cols="12"
          class="pa-0 ma-0"
          v-for="(post, index) in godarData"
          :key="'post' + index"
        >
            <product-card :admin="true" :editing="editingVendor" :post="post" :id="'id'+ post._id"/>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
"use strict";
// import data from "../../public/data.js";
import ProductCard from "../../../../../components/ProductCard.vue";
import axios from "axios";
import Header from '../../../../../components/Header.vue';


export default {
  name: "PostsDashboard",
  components: {
    ProductCard, Header
  },
  data: function () {
    return {
      godarData: null,
      scrollOptions: {
        duration: 500,
        offset: 0,
        easing: "easeInQuad",
      },
      editingVendor: false
    };
  },
  created() {
    axios({
      url: "http://localhost:8080/posts",
      method: "GET",
    }).then((response) => {
      console.log(response);
      this.godarData = response.data;
    });
  },
  mounted() {
    console.log(this.$route.hash)
    this.$vuetify.goTo(this.$route.hash, this.scrollOptions)
  },
  watch: {
    hash(newVal) {
      this.$vuetify.goTo(newVal, this.scrollOptions)
    }
  },

  computed: {
    hash() {
      return this.$route.hash
    }
  },
  methods: {
     onBasketButtonClick () {
      this.$store.commit('toggleBasketDialog')
    },
    handleEditVendor (e) {
      this.editingVendor = e
    }
  }
};
</script>

<style scoped>
</style>
