<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
'use strict'

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
}
</script>
<style>
@font-face {
  font-family: "IRANSans";
  src: local("IRANSans"), url("../static/fonts/IRANSans-Medium.ttf") format("truetype");
}
.dark-disabled-text .v-text-field__slot * {
  color: #262626 !important;
}
</style>