<template>
  <v-card tile rippled elevation="0" outlined class="product-card">
    <v-row no-gutters>
      <v-col id="imagecol" cols="12" sm="7" md="7" lg="7" class="pa-0">
        <v-window v-model="onboarding" :continuous="false" show-arrows>
          <template #prev="{ on, attrs }">
            <v-btn
              fab
              x-small
              v-bind="attrs"
              color="rgba(255,255,255,0.4)"
              v-on="on"
              ><v-icon color="white">mdi-chevron-right</v-icon></v-btn
            >
          </template>
          <template #next="{ on, attrs }">
            <v-btn
              fab
              v-bind="attrs"
              x-small
              color="rgba(255,255,255,.4)"
              v-on="on"
              ><v-icon color="white">mdi-chevron-left</v-icon></v-btn
            >
          </template>
          <div v-if="post.contents.length > 1">
            <v-window-item
              v-for="(image, n) in post.contents"
              :key="`card-${n}`"
              style="position: relative"
            >
              <v-card elevation="0" tile>
                <v-img :src="image.url" aspect-ratio="1" width="100%"></v-img>
              </v-card>
            </v-window-item>
          </div>
          <div v-else>
            <v-window-item style="position: relative">
              <v-card elevation="0" tile>
                <v-img
                  :src="post.contents[0].url"
                  aspect-ratio="1"
                  width="100%"
                ></v-img>
              </v-card>
            </v-window-item>
          </div>
        </v-window>
        <v-card-actions
          v-if="post.contents.length > 1"
          class="justify-center"
          style="padding: 6px"
        >
          <v-item-group v-model="onboarding" class="text-center" mandatory>
            <v-item
              v-for="n in post.contents.length"
              :key="`btn-${n}`"
              v-slot="{ active, toggle }"
            >
              <v-icon
                :input-value="active"
                size="10"
                :color="active ? '#0095F6' : '#a8a8a8'"
                @click="toggle"
                >mdi-record</v-icon
              >
            </v-item>
          </v-item-group>
        </v-card-actions>
      </v-col>
      <v-col cols="12" sm="5" md="5" lg="5" class="pa-0">
        <div v-if="admin">
          <v-col cols="12" class="px-6 py-2">
            <v-row align="center" no-gutters>
              <v-menu offset-x transition="slide-x-transition">
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    v-bind="attrs"
                    :disabled="!editing"
                    color="white"
                    elevation="0"
                    class="px-0"
                    v-on="on"
                  >
                    <v-icon color="#262626" class="ml-1">mdi-plus</v-icon
                    ><span
                      :style="editing ? 'color:#262626' : 'color:#c2c2c2'"
                      class="text-subtitle-2 ml-2"
                      >افزودن به دسته</span
                    >
                  </v-btn>
                </template>
                <v-list dense nav>
                  <v-list-item
                    v-for="(tag, index) in categories"
                    :key="index"
                    link
                    @click="chips.push(tag)"
                  >
                    <!-- @click="assignTagToProduct"
              @click="chips.push(tag)" -->
                    <v-list-item-icon>
                      <v-icon v-text="tag.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="tag.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- v-for="(selection, index) in $store.state.tags" -->
              <div
                v-for="(selection, index) in chips"
                :key="index"
                class="pa-1"
              >
                <v-chip
                  :close="editing"
                  class="text-caption font-weight-medium"
                  @click:close="remove(index)"
                >
                  {{ selection.title }}
                </v-chip>
              </div>
            </v-row>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-row
              :style="editing ? 'margin: 0 16px 16px 16px' : 'margin: 0 16px'"
            >
              <v-text-field
                v-model="product_name"
                :outlined="editing"
                :solo="!editing"
                :disabled="!editing"
                placeholder="نام محصول"
                dense
                hide-details
                flat
                color="#707070"
                class="
                  mx-0
                  mt-0
                  text-body-2
                  font-weight-mudium
                  dark-disabled-text
                "
              ></v-text-field>
            </v-row>
          </v-col>
          <v-row style="margin: 0px 16px">
            <v-textarea
              v-model="post.caption"
              v-resize="onResize"
              :solo="!editing"
              :disabled="!editing"
              :outlined="editing"
              placeholder="توضیحات محصول..."
              class="mx-0 pt-0 text-caption dark-disabled-text"
              rows="1"
              hide-details
              flat
              auto-grow
              color="#707070"
            ></v-textarea>
          </v-row>
          <v-row
            align="center"
            justify="space-between"
            style="margin: 4px 16px 12px 16px"
          >
            <v-col cols="6">
              <!-- 
          <v-row align="center" justify="space-around">
            <v-btn icon v-if="editing"
              ><v-icon color="#262626">mdi-plus</v-icon></v-btn
            >
            <v-text-field
              class="
                text-body-2
                font-weight-mudium
                ma-0
                shrink
                dark-disabled-text
              "
              v-model="qty"
              style="width: 40px"
              :outlined="editing"
              :solo="!editing"
              :disabled="!editing"
              hide-details
              dense
              flat
            >
            </v-text-field>
            <span class="text-subtitle-2 my-0 mx-1">عدد</span>
            <v-btn icon v-if="editing"
              ><v-icon color="#262626">mdi-minus</v-icon></v-btn
            ></v-row
          > -->

              <v-switch
                v-model="inStock"
                color="green"
                :disabled="!editing"
                inset
                class="mt-0 pt-0"
                hide-details
              >
                <template #label>
                  <span
                    v-if="inStock"
                    class="text-body-2 font-weight-medium dark-disabled-text"
                    >موجود</span
                  >
                  <span
                    v-else
                    class="text-body-2 font-weight-medium dark-disabled-text"
                    >ناموجود</span
                  >
                </template></v-switch
              >
            </v-col>
            <v-col cols="6" class="px-0">
              <v-text-field
                v-model="product_price"
                color="#707070"
                :outlined="editing"
                :solo="!editing"
                :disabled="!editing"
                hide-details
                dense
                flat
                placeholder="قیمت محصول"
                class="text-body-2 font-weight-medium dark-disabled-text"
              >
                <template #append
                  ><span class="text-caption">تومان</span></template
                >
              </v-text-field>
            </v-col>
          </v-row>
        </div>
        <div v-else class="mx-4">
          <v-row
            class="ma-1 bookmark-position"
            align="center"
            style="z-index: 1"
          >
            <v-btn icon @click="$store.commit('toggleLoginDialog')">
              <v-icon color="#262626">{{
                wish ? "mdi-bookmark" : "mdi-bookmark-outline"
              }}</v-icon>
            </v-btn>
          </v-row>
          <v-card v-resize="onResize" flat>
            <v-card-title class="pa-0">
              <v-row
                class="pb-2 product-name"
                align="center"
                no-gutters
                :style="
                  post.contents.length > 1
                    ? 'padding-top: 0'
                    : 'padding-top: 12px'
                "
              >
                <p color="#707070" class="text-body-1 font-weight-bold my-0">
                  {{ post.product_name }}
                </p>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-0" style="overflow: auto;" :height="captionHeight">
              <span
                class="text-body-2"
                style="white-space: pre-wrap; color: #262626"
              >{{ shownCaption() }}</span>
              <span
                v-if="hasMoreCaption && !showMore"
                class="text-body-2"
                style="color: #8e8e8e"
                @click="showMore = true"
              >... بیشتر</span
              >
            </v-card-text>

            <v-card-actions class="pa-0">
              <v-row style="margin: 20px 0px" align="center">
                <v-col cols="6" class="pa-0">
                  <v-btn
                    v-if="!inStock"
                    block
                    elevation="0"
                    color="#0095F6"
                    style="padding: 8px 20px"
                    class="text-subtitle-2 white--text"
                    @click="onPurchaseButtonClick"
                  >
                   افزودن به سبد خرید
                  </v-btn>
                   <v-btn v-else
                    disabled
                    block
                    elevation="0"
                    color="#c2c2c2"
                    style="padding: 8px 20px"
                    class="text-subtitle-2 secondary--text"
                    @click="onPurchaseButtonClick"
                  >
                    ناموجود
                  </v-btn>
                  <!-- for now !inStock is the correct answer -->
                </v-col>
                <v-col cols="6">
                  <v-row justify="center">
                    <p class="text-body-1 font-weight-bold ma-0">
                      {{ post.product_price.toLocaleString()
                      }}<span class="text-caption pr-1">تومان</span>
                    </p>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",

  props: ["post", "editing", "admin"],

  data: () => ({
    onboarding: 0,
    active: false,
    inStock: false,
    wish: false,
    showMore: false,
    hasMoreCaption: false,
    windowWidth: 400,
    windowHeight: 200,
    captionHeight: 150,
    charactersPerLine: 55,
    shownLines: 2,
    product_name: null,
    product_price: "",
    categories: [
      { title: "موجود", icon: "mdi-bell-check-outline" },
      { title: "حراج", icon: "mdi-percent-outline" },
      { title: "سفارشی", icon: "mdi-star-outline" },
    ],
    chips: [],
  }),
  computed: {
    maximumShownCharacters() {
      return this.shownLines * this.charactersPerLine;
    },
  },
  mounted() {
    this.onResize();
  },

  methods: {
    onPurchaseButtonClick() {
      this.$store.commit("addToCart", this.post);
    },
    onSaveButtonClick() {
      this.$store.commit("assignInfo", this.tag);
    },
    remove(selection) {
      this.chips.splice(this.chips.indexOf(selection), 1);
      this.chips = [...this.chips];
    },

    shownCaption() {
      if (this.post.caption.length < this.maximumShownCharacters) {
        this.hasMoreCaption = false;
        this.showMore = false;
        return this.post.caption;
      } else {
        this.hasMoreCaption = true;
        if (!this.showMore && this.windowWidth < 600) {
          return this.post.caption.substr(0, this.maximumShownCharacters);
        } else {
          this.showMore = true;
          return this.post.caption;
        }
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 935) {
        this.captionHeight = (7 / 12) * 935 - 120;
      }else{
        this.captionHeight = (7 / 12) * this.windowWidth - 120;
      }
    //   console.log(this.captionHeight)
      this.charactersPerLine = (55 / 400) * this.windowWidth;
      this.shownCaption();
    },
    next() {
      this.onboarding =
        this.onboarding + 1 === this.post.contents.length
          ? 0
          : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0
          ? this.post.contents.length - 1
          : this.onboarding - 1;
    },
  },
};
</script>


<style scoped>
@media screen and (max-width: 600px) {
  .bookmark-position {
    position: absolute;
    top: 100vw;
    left: 0;
  }
  .product-card {
    margin-bottom: 0;
    border: 0;
  }
}
@media screen and (min-width: 600px) {
  .bookmark-position {
    position: absolute;
    top: 4px;
    left: 0;
  }
  .product-card {
    margin-bottom: 32px;
  }

  .product-name {
    padding-top: 16px !important;
  }
}
.v-input .v-label {
  font-size: 12px !important;
}
</style>