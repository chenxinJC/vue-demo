import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  modules: {
    user
  },
  getters
})

export default store
