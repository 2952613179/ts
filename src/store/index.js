import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    createUser(state, obj) {
      window.sessionStorage.setItem("obj", JSON.stringify(obj));
      state.user = obj;
    }
  },
  actions: {
  },
  modules: {
  }
})
