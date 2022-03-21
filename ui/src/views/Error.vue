<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <Error_Green class="mt-5"></Error_Green>
    <h3 class="title mt-5">Uh Oh! Something went wrong, please try again!</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Error_Green from '../assets/Error_Green.svg'
export default Vue.extend({
  name: "Error",
  components: { Error_Green }
})
</script>