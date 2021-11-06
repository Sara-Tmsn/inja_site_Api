
<template>
  <v-container style="max-width: 935px">
    <Header
      :backButton="true"
      :admin="false"
      :title="full_name"
    />
    <v-row align="center" class="mt-11">
      <v-col
        cols="12"
        class="pa-0 ma-0"
        v-for="(post, index) in godarData"
        :key="'post' + index"
      >
        <product-card :admin="false" :post="post" :id="'id' + post._id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
"use strict";
import ProductCard from "../../../../components/ProductCard.vue";
import Header from "../../../../components/Header.vue";
import axios from "axios";

export default {
  name: "Posts",
  components: {
    ProductCard,
    Header,
  },
  data: function () {
    return {
      username: null,
      full_name: null,
      godarData: null,
      creatorData: null,
      scrollOptions: {
        duration: 500,
        offset: 0,
        easing: "easeInQuad",
      },
      editingVendor: false,
    };
  },
  created() {
    axios({
      url: "http://localhost:8080/posts",
      method: "GET",
    }).then((response) => {
      // console.log(response);
      this.godarData = response.data;
      // console.log(this.$route.params)
    });
    axios({
      url: "http://localhost:3000/creators",
      method: "GET",
    }).then((response) => {
      // console.log(response)
      this.creatorData = response.data;
      this.full_name = this.creatorData.full_name;
      this.userName = this.creatorData.username;
    });
  },
  mounted() {
    // console.log(this.$route.hash);
    this.$vuetify.goTo(this.$route.hash, this.scrollOptions);
  },
  watch: {
    // godarData:function(newVal) {

      hash(newVal) {
      this.$vuetify.goTo(newVal, this.scrollOptions);
    }   
  },
  // updated() {

  // },
  computed: {
    hash() {
      return this.$route.hash;
    },
    postData() {
      return this.godarData;
    }
  },
  methods: {
    onBasketButtonClick() {
      this.$store.commit("toggleBasketDialog");
    },
    handleEditVendor(e) {
      this.editingVendor = e;
    },
  },
};
</script>

<style scoped>
</style>
