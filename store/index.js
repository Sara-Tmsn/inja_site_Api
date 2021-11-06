import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { user } from './user';


Vue.use(Vuex)


export default () => new Vuex.Store({
  state: () => ({
    // products: [],
    loginDialog: false,
    cart: [],
  }),

  mutations: { //syncronous
    setQuantity(state, payload) {
      state.cart[payload.index].qty = payload.qty
      let toLocal = state.cart.map(item => { return { id: item.product._id, qty: item.qty } })
      localStorage.setItem("cart", JSON.stringify(toLocal))
    },
    toggleLoginDialog(state) {
      state.loginDialog = !state.loginDialog
    },
    addToCart(state, payload) {
      // console.log(payload)
      if (payload) {
        let found = state.cart.find(item => item.product._id === payload._id);
        if (found) {
          found.qty++;
        } else {
          state.cart.push({
            product: payload,
            qty: 1
          })
        }
        let toLocal = state.cart.map(item => { return { id: item.product._id, qty: item.qty } })
        localStorage.setItem("cart", JSON.stringify(toLocal))
        // console.log(state.cart)
      }
    },
    updateCart(state, payload) {
      // console.log(payload)
      if (payload) {
        state.cart.push({
          product: payload.product,
          qty: payload.qty
        })
      }
    },
    // assignInfo(state, payload) {
    //   console.log(payload)
    //   state.products.push(payload)
    //   localStorage.setItem('products', JSON.stringify(state.products));
    //   console.log(state.tags)
    // },
    removeProduct(state, payload) {
      state.cart.splice(payload, 1);
      let toLocal = state.cart.map(item => { return { id: item.product._id, qty: item.qty } })
      localStorage.setItem("cart", JSON.stringify(toLocal))
    },

  },

  actions: { //asyncronous
    updateCartFromLocalStorage({state, commit}, payload) {
      console.log(payload)
      if (payload && payload.length) {
        // console.log('getting the shopping cart posts...')
        payload.forEach(item => {
          // console.log(item)
          axios({
            url:
              "http://localhost:8080/posts/?" +
              "_id=" +
              item.id,
            method: "GET",
          }).then((response) => {
            commit('updateCart', {
              product: response.data[0],
              qty: item.qty
            })
          });
          
        });
        console.log(state)
      }
    },
  }
});
