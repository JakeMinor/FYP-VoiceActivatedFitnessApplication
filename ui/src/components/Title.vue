<template>
  <div>
    <h2 class="mb-3" v-if="type === 'Page'">{{title}}</h2>
    <h4 class="mb-2" v-else>{{title}}</h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "Title",
  props: {
    type: {
      type: String,
      validator: (prop) => ['Page', 'Subtitle'].some(type => type == prop),
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
})
</script>