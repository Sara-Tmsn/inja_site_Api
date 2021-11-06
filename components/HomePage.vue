
<template>
  <v-container pa-0 style="max-width: 935px">
    <Header
      :admin="admin"
      :title="full_name"
      @edit-vendor="handleEditVendor"
    />

    <v-row align="center" no-gutters justify="center">
      <v-col cols="12" class="mt-14">
        <div v-if="admin">
          <v-file-input
            v-model="banner"
            :disabled="!editingVendor"
            solo
            justify="center"
            class="px-4 text-body-2 font-weight-medium"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-image-outline"
            placeholder="برای فروشگاه خود بنر انتخاب کنید"
            flat
            dense
            hide-details
            :hide-input="url"
            @change="Preview_image"
          ></v-file-input>
          <v-img v-if="url" :src="url" aspect-ratio="2" width="100%"></v-img>
        </div>
        <v-img v-else src="../godar.jpg" aspect-ratio="2" width="100%" />
      </v-col>
      <v-col cols="12" class="py-2 px-4 ma-0">
        <v-textarea
          v-if="admin"
          :disabled="!editingVendor"
          :outlined="editingVendor"
          :solo="!editingVendor"
          placeholder="درباره شما..."
          class="ma-0 pa-0 text-body-2 font-weight-medium dark-disabled-text"
          color="#707070"
          counter="150"
          rows="1"
          hide-details
          flat
          auto-grow
        ></v-textarea>
        <p v-else class="ma-2 text-body-1 font-weight-medium" color="#707070">
          {{ creatorData.biography }}
        </p>
      </v-col>
      <v-row id="buttons" align="center" no-gutters class="mx-4 mt-4">
        <v-col cols="4">
          <button v-ripple class="btn font-weight-medium pa-1" style="max-width: 100%; min-width:100%">مشاهده وبسایت</button>
        </v-col>
        <v-col cols="4" class="px-1">
          <button v-ripple class="btn font-weight-medium pa-1" style="max-width: 100%; min-width:100%">تماس</button>
        </v-col>
        <v-col cols="4">
          <button v-ripple class="btn font-weight-medium pa-1" style="max-width: 100%; min-width:100%">آدرس</button>
        </v-col>
      </v-row>
      <v-col cols="12" class="pt-4 px-4">
        <v-text-field
          id="search"
          dense
          color="black"
          background-color="#fafafa"
          flat
          clearable
          hide-details
          placeholder="جستجو در این فروشگاه ..."
          solo
          style="max-width: 100%; font-size: 13px"
          @click="$vuetify.goTo('#search', scrollOptions)"
        >
          <template #prepend-inner>
            <v-fade-transition leave-absolute>
              <img src="../static/search.svg" class="mx-2" />
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-col>
      <v-row no-gutters class="pa-0 mt-4" align="center">
        <v-sheet class="ma-0 pa-0" max-width="100vw">
          <v-tabs v-if="admin" v-model="tab" right color="#262626" slider-size="1">
            <v-tab v-for="item in items" :key="item.title"
              >{{ item.title }}
            </v-tab>
          </v-tabs>
          <v-tabs v-else v-model="tab" right color="#262626" slider-size="1">
            <v-tab>همه</v-tab>
            <v-tab v-for="(item, index) in tags" :key="index"
              >{{ item.title }}
            </v-tab>
          </v-tabs>
        </v-sheet>
          <hr style="height: 1px; border-width: 0; width: 100%; background-color: #dbdbdb; margin-bottom: 2px" />
        <!-- <v-divider></v-divider> -->
      </v-row>
    </v-row>
    <v-row no-gutters class="rows-left-margin">
      <v-tabs-items v-model="tab" style="width: 100%">
        <v-tab-item v-if="admin">
          <v-row no-gutters>
            <v-col
              v-for="(post, index) in godarData"
              :key="'post' + index"
              cols="4"
              class="image-padding"
            >
              <post-card :post="post" :config="cardConfig" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row no-gutters>
            <v-col
              v-for="(post, index) in godarData"
              :key="'post' + index"
              cols="4"
              class="image-padding"
            >
              <post-card :post="post" :config="cardConfig" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row no-gutters>
            <v-col
              v-for="(post, index) in godarData"
              :key="'post' + index"
              cols="4"
              class="image-padding"
            >
              <post-card :post="post" :config="cardConfig" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row no-gutters>
            <v-col
              v-for="(post, index) in godarData"
              :key="'post' + index"
              cols="4"
              class="image-padding"
            >
              <post-card :post="post" :config="cardConfig" />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row no-gutters>
            <v-col
              v-for="(post, index) in godarData"
              :key="'post' + index"
              cols="4"
              class="image-padding"
            >
              <post-card :post="post" :config="cardConfig" />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>

<script>
"use strict";
import axios from 'axios'
import PostCard from "./PostCard.vue";
import Header from "./Header.vue";
export default {
  name: "HomePage",
  components: {
    PostCard,
    Header,
  },
  props: ["admin", "cardConfig"],
  data () {
    return {
      userName: null,
      full_name: null,
      url: null,
      error: false,
      tab: null,
      tags: [
        { title: "موجود", icon: "mdi-bell-check-outline" },
        { title: "حراج", icon: "mdi-percent-outline" },
        { title: "سفارشی", icon: "mdi-star-outline" },
      ],
      items: [{ title: "پست‌ها", icon: "mdi-apps-outline" }],
      godarData: null,
      creatorData: {},
      scrollOptions: {
        duration: 500,
        offset: 50,
        easing: "easeInQuad",
      },
      editingVendor: false,
      banner: [],
    };
  },
  computed: {
    selections() {
      const selections = [];
      for (const selection of this.items) {
        selections.push(selection);
      }
      return selections;
    },
  },
  created() {
    axios({
      url: "http://localhost:8080/posts/?" +
      "_creator=" + this.$route.params._id,
      method: 'GET',
    })
    .then((response) => {
      // console.log(response)
      this.godarData = response.data
    })
    axios({
      url: "http://localhost:8080/creators/?" +
      "_id=" + this.$route.params._id,
      method: 'GET',
    })
    .then((response) => {
      // console.log(response)
      this.creatorData = response.data[0]
      this.full_name = this.creatorData.full_name
      this.userName = this.creatorData.username
    })
  },
  methods: {
    onBasketButtonClick() {
      this.$store.commit("toggleBasketDialog");
    },
    handleEditVendor(e) {
      this.editingVendor = e;
    },
    Preview_image() {
      if (!this.banner) return;
      this.url = URL.createObjectURL(this.banner);
      // console.log(this.url);
    },
    remove(selection) {
      this.items.splice(this.items.indexOf(selection), 1);
      this.items = [...this.items];
    },
    scrapeInsta () {
      axios({
        url: "http://localhost:8080/posts",
        method: 'POST',
        data: {
          username: 'godarhandmade'
        }
      })
      .then((response) => {
        // console.log(response)
      })
    }
  },
};
</script>

<style>
@media screen and (max-width: 734px) {
  .image-padding {
    padding: 0 0 2px 2px !important;
  }
  .rows-left-margin {
    margin: 0 0 0 -2px !important;
  }
}
@media screen and (min-width: 735px) {
  .image-padding {
    padding: 0 0 28px 28px !important;
  }
  .rows-left-margin {
    margin: 0 0 0 -28px !important;
  }
}

.v-slide-group__next,
.v-slide-group__prev {
  flex: 0 1 0px !important;
  min-width: 0px !important;
}

.btn {
  border: 1px solid #dbdbdb;
  background-color: white;
  color: #262626;
  /* padding: 4px; */
  /* max-width: 100%;
  min-width: 100%; */
  font-size: 12px;
  border-radius: 4px;
}
</style>
