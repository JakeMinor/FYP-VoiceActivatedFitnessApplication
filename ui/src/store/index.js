import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: ''
  },
  mutations: {
    /**
     * Sets the user and access token in the store.
     */
    async setUser (state, payload) {
      state.user = payload.user
      state.token = payload.token
    }
  },
  actions: {
    /**
     * Call the mutation method to set the user.
     */
    async setUser({ commit }, payload) {
      commit('setUser', payload)
    }
  },
  getters: {
    /**
     * Gets the user from the store.
     */
    user: state => state.user,
    /**
     * Gets the access token from the store.
     */
    accessToken: state => state.token
  }
})
