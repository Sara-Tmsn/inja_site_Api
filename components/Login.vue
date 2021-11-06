<template>
  <v-row justify="center" class="ma-0">
    <v-dialog
      v-model="$store.state.loginDialog"
      transition="dialog-bottom-transition"
      content-class="login-dialog"
    >
      <v-card class="mx-auto" tile height="inherit">
        <v-card-title class="px-2 py-3 justify-space-between">
          <v-btn :disabled="step === 0" icon @click="step--">
            <v-icon color="#262626"> mdi-arrow-right </v-icon>
          </v-btn>
          <v-btn icon @click="$store.commit('toggleLoginDialog')">
            <v-icon color="#262626"> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-row align="center" class="pb-4 ma-0">
          <v-window v-model="step" style="width: 100%; height: 200px">
            <v-card-title class="text-bold py-0">
              ورود به حساب کاربری
            </v-card-title>
            <v-window-item :value="0">
              <v-card-text class="pb-0">
                <span class="black--text text--darken-1">
                  <p class="font-weight-medium pa-0 mt-2">
                    شماره موبایل خود را وارد کنید
                  </p>
                  <p style="color: #707070" class="caption">
                    برای ادامهٔ کار لازم است که وارد حساب خود شوید. لطفاً
                    شمارهٔ‌ موبایل خود را وارد کنید. کد تأیید به این شماره پیامک
                    خواهد شد.
                  </p>
                </span>
                <v-text-field
                  solo
                  background-color="#f1f1f1"
                  hide-details
                  style="max-width: 100%"
                  label="09123456789"
                  placeholder="09123456789"
                  flat
                ></v-text-field>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="1">
              <v-card-text class="pb-0">
                <span class="black--text text--darken-1">
                  <p class="font-weight-medium pa-0 mt-2">
                    کد تایید را وارد کنید
                  </p>
                  <p style="color: #707070" class="caption">
                    کد تایید برای شماره 09123456789 ارسال گردید
                  </p>
                </span>
                <v-text-field
                  v-model="smsCode"
                  solo
                  background-color="#f1f1f1"
                  hide-details
                  style="max-width: 100%"
                  flat
                >
                </v-text-field>
              </v-card-text>
            </v-window-item>
          </v-window>
          <v-row class="ma-4" align="center" justify="center">
            <v-btn
              block
              color="#0095F6"
              elevation="0"
              class="text-subtitle-2 white--text"
              @click="onButtonClick"
            >
              {{buttonText[step]}}
            </v-btn>
          </v-row>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
"use strict";
export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      step: 0,
      buttonText: ['ورود به فروشگاه', 'تایید'],
      smsCode: "",
    };
  },
  computed: {
    //
  },

  methods: {
    onButtonClick () {
      if (this.step === 0) {
        this.step = this.step + 1
      } else if (this.step === 1) {
       this.$store.commit('toggleLoginDialog')
      }
    }
    
  },
};
</script>

<style>
@media screen and (max-width: 660px) {
  .login-dialog {
    height: 100% !important;
    width: 100% !important;
    max-height: 100% !important;
    margin: 0 !important;
    border-radius: 0px !important;
  }
}
@media screen and (min-width: 660px) {
  .login-dialog {
    width: 400px !important;
    border-radius: 20px !important;
  }
}
</style>
