<template>
  <div v-if="statistics">
    <Title :title="title" type="Page"/>
    <b-button :to="{ name: 'Completed Workouts' }" variant="primary" class="w-25">Back</b-button>
    <div class="d-flex mt-3">
      <b-card class="mr-2">
        <Title title="Workout Details" type="Subtitle" />
        <ul class="list-unstyled">
          <li>Date Completed: {{ completedDate }}</li>
          <li>Total Sets Completed: {{ totalSetsCompleted }}</li>
          <li>Total Reps Completed: {{ totalRepsCompleted }}</li>
          <li>Total Weight Lifted: {{ totalWeightLifted }}kg</li>
        </ul>
      </b-card>
      <b-card class="ml-2 w-75">
        <Title title="Exercises Performed" type="Subtitle" />
        <b-table :fields="tableHeaders" :items="statistics">
        </b-table>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from "../components/Title.vue";
import api from '../api/api'
import { formatDate } from '@/helper';

export default Vue.extend({
  name: "WorkoutStatistics.vue",
  components: { Title },
  data() {
    return {
      statistics: null
    }
  },
  computed: {
    tableHeaders() {
      return [
        { key: "Exercise.name", sortable: true },
        { key: "set", sortable: true },
        { key: "reps", sortable: true },
        { key: "time", sortable: true },
        { key: "weight", sortable: true }
      ]
    },
    totalWeightLifted() {
      return this.statistics.map(statistic => statistic.weight).reduce((a, b) => a + b, 0);
    },
    totalRepsCompleted() {
      return this.statistics.map(statistic => statistic.reps).reduce((a, b) => a + b, 0);
    },
    totalSetsCompleted() {
      return this.statistics.map(statistic => statistic.reps !== null).length
    },
    completedDate() {
      return formatDate(this.statistics[0].completedDate)
    },
    title() {
      return `Statistics for ${this.statistics[0].Workout.name} completed on ${formatDate(this.statistics[0].completedDate)}`
    },
  },
  methods: {
    formatDate
  },
  async mounted() {
    if(!this.$route.params.date){
      await this.$router.push("Error")
    }
    this.statistics = await api.getWorkoutStatistics(this.$route.params.date)
  }
})
</script>