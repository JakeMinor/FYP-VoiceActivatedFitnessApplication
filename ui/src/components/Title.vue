<template>
  <div>
    <h2 class="mb-3 title" v-if="type === 'Page'">{{title}}</h2>
    <h4 class="mb-2 title" v-else>{{title}}</h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "Title",
  props: {
    // The type of the title.
    type: {
      type: String,
      // Validates the title string passed in is either Page or Subtitle.
      validator: (prop) => ['Page', 'Subtitle'].some(type => type == prop),
      required: true
    },
    // The text to be included in the title.
    title: {
      type: String,
      required: true
    }
  }
})
</script>