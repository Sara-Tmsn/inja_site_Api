<template>
  <v-container style="max-width: 935px" pa-0>
    <Header
      :admin="true"
      title="اطلاعات ارسال"
      :showCart="false"
      :backButton="true"
      :addButton="true"
    />
    <v-col cols="12" class="pa-0 mt-14">
        <v-card v-for="type in $store.state.types" :key="type.title" flat style="border-bottom-style: solid">
          <v-card-title class="px-4 py-2" >
              <v-row no-gutters>
                <v-col cols="12" class="pa-0">
                  <v-row no-gutters align="center">
                    <v-col cols="6" class="pa-0">
                     <!--<span-->
                     <!--style="color: #262626; font-weight: 400"-->
                     <!-- >ویرایش نحوه ارسال</span>-->
                        <span
                          style="color: #262626; font-weight: 400"
                          class="text-body-2"
                        >{{type.title}}</span>
                    </v-col>
                    <v-col
                      cols="4"
                      class="text--secondary pa-0 pl-1"
                    >
                      <v-row no-gutters justify="end">

                          <span
                            :style="type.price===0 ? 'font-size: 14px' : 'font-size: 16px'"
                            style="color: #262626; font-weight: 400"
                          >{{type.price===0 ? 'رایگان' : type.price.toLocaleString()}}
                            <span class="text-caption">{{type.price===0 ? '' : 'تومان'}}</span>
                          </span>
                      </v-row>
                    </v-col>

                  </v-row>
                </v-col>
                <v-col cols="10" class="pa-0" :style="type.description ? 'margin-top: 8px' : 'margin-top: 30px'">
                    <span
                      class="text-subtitle-2"
                      style="color: #707070"
                    >
                  {{type.description}}
                </span>
                </v-col>
                <v-col cols="2"><v-row no-gutters justify="end"><v-icon>mdi-chevron-left</v-icon></v-row></v-col>

              </v-row>
          </v-card-title>
<!--          <v-expansion-panel-content class="px-6 pb-4">-->
<!--            <v-col cols="12" class="pa-0">-->
<!--              <v-text-field-->
<!--                v-model="type.title"-->
<!--                dense-->
<!--                outlined-->
<!--                flat-->
<!--                hide-details-->
<!--                background-color="#fff"-->
<!--                color="#262626"-->
<!--                style="max-width: 100%; margin-bottom: 12px; font-size: 14px"-->
<!--                label="نوع ارسال"-->
<!--              ></v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" class="pa-0">-->
<!--              <p class="text-body-2 pa-0 mb-2" style="color: #707070">-->
<!--                هزینه ارسال </p></v-col-->
<!--            >-->
<!--            <v-col cols="12" class="pa-0">-->
<!--              <v-text-field-->
<!--                v-model="type.price.toLocaleString()"-->
<!--                dense-->
<!--                outlined-->
<!--                flat-->
<!--                hide-details-->
<!--                background-color="#fff"-->
<!--                color="#262626"-->
<!--                style="max-width: 100%; margin-bottom: 12px; font-size: 14px"-->
<!--                label="هزینه ارسال"-->
<!--                 >-->
<!--                <template #append-->
<!--                ><span class="text-caption">تومان</span></template-->
<!--                >-->
<!--              </v-text-field>-->
<!--            </v-col>-->
<!--            <v-col cols="12" class="pa-0">-->
<!--              <p class="text-body-2 pa-0 mb-2" style="color: #707070">-->
<!--                توضیحات </p></v-col-->
<!--            >-->
<!--            <v-col cols="12" class="pa-0">-->
<!--              <v-text-field-->
<!--                v-model="type.description"-->
<!--                dense-->
<!--                outlined-->
<!--                flat-->
<!--                hide-details-->
<!--                background-color="#fff"-->
<!--                color="#262626"-->
<!--                style="max-width: 100%; margin-bottom: 12px; font-size: 14px"-->
<!--                label="توضیحات"></v-text-field>-->
<!--            </v-col>-->
<!--          </v-expansion-panel-content>-->
        </v-card>
<!--      </v-expansion-panels>-->
    </v-col>
  </v-container>
</template>

<script>
  'use strict'


  export default {
    name: 'Shipping',
    layout: 'account',
    components: {},
    data() {
      return {
        panels: []
      }
    },
    computed: {},

    methods: {}
  }
</script>

<style scoped>
  .v-text-field--outlined >>> fieldset {
    border-color: #dbdbdb;
  }
</style>
