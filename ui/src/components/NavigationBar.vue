<template>
  <div class="mb-4 shadow-sm">
    <b-navbar class="navbar">
      <h2>Voice Activated Fitness</h2>
      <b-collapse is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              {{ username }}
            </template>
            <b-dropdown-item>Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import store from '../store/index'
export default Vue.extend({
  name: "NavigationBar",
  computed: {
    username() {
      return store.getters.user?.email ?? ""
    }
  }
})
</script>