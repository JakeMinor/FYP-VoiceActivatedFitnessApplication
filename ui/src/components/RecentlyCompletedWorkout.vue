<template>
  <div class="d-flex border p-2 mb-2">
    <div class="m-auto">{{ workoutName }} on {{ formatDate(completedDate) }}</div>
    <div class="ml-auto">
      <b-button variant="primary">View Details</b-button>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import { formatDate } from '@/helper';

export default Vue.extend({
  name: "RecentlyCompletedWorkout",
  props: {
    workoutName: {
      type: String,
      required: true,
      default: ""
    },
    completedDate: {
      type: String,
      required: true
    }
  },
  methods: {
    formatDate
  }
})
</script>