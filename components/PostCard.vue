<template>
<NuxtLink :to="{
      name: config.link === '' ? 'creator-_id-posts' : 'dashboard-creator-_id-posts',
      params: { id: post._id, name: post.product_name, _id: $route.params._id },
      hash: '#id' + post._id,
    }">
  <v-card
    tile
    rippled
    flat
   
  >
    <v-icon
      v-if="post.contents.length > 1"
      size="20"
      color="white"
      style="position: absolute; z-index: 1; right: 8px; top: 8px"
      >mdi-checkbox-multiple-blank</v-icon
    >
    <v-img
      :src="post.contents[0].url"
      aspect-ratio="1"
      width="100%"
      style="position: relative"
      gradient="to bottom, rgba(38,38,38,0) 75%, rgba(38,38,38,1)"
      ><div style="position: absolute; z-index: 1; right: 8px; bottom: 8px">
        <span v-resize="onResize" class="text-body-1" style="color: white">{{
          shownProductName()
        }}</span
        ><span v-if="hasLongerName" class="text-body-2" style="color: white">
          ...</span
        >
      </div></v-img
    >
  </v-card>
</NuxtLink>
</template>

<script>
export default {
  name: 'PostCard',

  props: ['post', 'config'],

  data: () => ({
    hasLongerName: false,
    windowWidth: 112,
    charactersPerLine: 10,
    shownLines: 1,
  }),
  computed: {
    maximumShownCharacters() {
      return this.shownLines * this.charactersPerLine
    },
  },
  methods: {
    shownProductName() {
      if (this.post.product_name.length < this.maximumShownCharacters) {
        this.hasLongerName = false
        return this.post.product_name
      } else {
        this.hasLongerName = true
        return this.post.product_name.substr(0, this.maximumShownCharacters)
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth / 3
      this.charactersPerLine = (10 / 112) * this.windowWidth
      this.shownProductName()
    },
  },
}
</script>


<style scoped>
</style>