<template>
  <div class="mb-4 shadow-sm">
    <b-navbar class="navbar">
      <h2 class="navbar-title">Voice Activated <span class="navbar-title-green">Fitness</span></h2>
      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              {{ username }}
            </template>
            <b-dropdown-item @click="signOut">Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="navbar-links">
      <router-link class="ml-1 mr-3 align-self-center" to="/">Dashboard</router-link>
      <router-link class="ml-1 mr-3 align-self-center" :to="{ name: 'Completed Workouts'}">Completed Workouts</router-link>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import store from '../store/index'
import api from '../api/api'

export default Vue.extend({
  name: "NavigationBar",
  computed: {
    /**
     * Gets the users username from the store.
     */
    username() {
      return store.getters.user?.email ?? ""
    }
  },
  methods: {
    async signOut() {
      await api.signOut()
      await api.authenticate()
    }
  }
})
</script>