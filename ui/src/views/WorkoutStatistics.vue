<template>
  <div v-if="statistics">
    <Title :title="title" type="Page"/>
    <b-button :to="{ name: 'Completed Workouts' }" variant="primary" class="w-25">Back</b-button>
    <div class="d-flex mt-3">
      <b-card class="mr-2 pr-4">
        <Title title="Workout Details" type="Subtitle" />
        <ul class="list-unstyled">
          <li class="pb-3"><strong>Date Completed:</strong> {{ completedDate }}</li>
          <li class="pb-3"><strong>Total Sets Completed:</strong> {{ totalSetsCompleted }}</li>
          <li class="pb-3"><strong>Total Reps Completed:</strong> {{ totalRepsCompleted }}</li>
          <li><strong>Total Weight Lifted:</strong> {{ totalWeightLifted }}kg</li>
        </ul>
      </b-card>
      <b-card class="ml-2 w-75">
        <Title title="Exercises Performed" type="Subtitle" />
        <b-table :fields="tableHeaders" :items="filteredItems" show-empty empty-text="No statistics could be found.">
          <template #head(Exercise.name)>
            Exercise Name
            <b-input id="nameFilter" v-model="filters.name" size="sm" class="mt-2" placeholder="Exercise Name..."></b-input>
          </template>
          <template #head(actions)="head">
            <div class="d-flex flex-column">
              {{ head.label }}
              <b-button class="mt-3 text-left p-0 font-weight-normal" variant="link" @click="resetFilters">Reset filters</b-button>
            </div>
          </template>
          <template #cell(reps)="cell">
            {{ cell.item.reps === null ? 'N/A' : `${cell.item.reps} reps` }}
          </template>
          <template #cell(time)="cell">
            {{ cell.item.timePerformed === null ? 'N/A' : `${cell.item.timePerformed} seconds` }}
          </template>
          <template #cell(weight)="cell">
            {{ cell.item.weight === null ? 'N/A' : `${cell.item.weight}kg` }}
          </template>
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
      statistics: null, // The list of statistics.
      filters: {
        name: '' // Filter the workouts by name.
      }
    }
  },
  computed: {
    /**
     * Return a list of headings for the table specifying if they are sortable fields.
     */
    tableHeaders() {
      return [
        { key: "Exercise.name", sortable: true },
        { key: "set", sortable: true },
        { key: "reps", sortable: true },
        { key: "time", sortable: true },
        { key: "weight", sortable: true },
        { key: "actions", sortable: false }
      ]
    },
    /**
     * Return a list of filtered workouts based on the value in the name table filter.
     */
    filteredItems() {
      return this.$data.statistics.filter((statistic) => statistic.Exercise.name.includes(this.filters.name))
    },
    /**
     * Return the total weight lifted for the workout.
     */
    totalWeightLifted() {
      return this.statistics.map(statistic => statistic.weight).reduce((a, b) => a + b, 0);
    },
    /**
     * Return the total reps completed for the workout.
     */
    totalRepsCompleted() {
      return this.statistics.map(statistic => statistic.reps).reduce((a, b) => a + b, 0);
    },
    /**
     * Return the total sets completed for the workout.
     */
    totalSetsCompleted() {
      return this.statistics.map(statistic => statistic.reps !== null).length
    },
    /**
     * Return the completed date of the workout
     */
    completedDate() {
      return formatDate(this.statistics[0].completedDate)
    },
    /**
     * Format the title of the page.
     */
    title() {
      return `Statistics for ${this.statistics[0].Workout.name} completed on ${formatDate(this.statistics[0].completedDate)}`
    },
  },
  methods: {
    /**
     * Format Date function from helper.js
     */
    formatDate,
    /**
     * Reset the table filters.
     */
    resetFilters() {
      this.filters.name = ''
    }
  },
  async mounted() {
    // Push the user to the error page if there isn't a date in the url.
    if(!this.$route.params.date){
      await this.$router.push("Error")
    }
    // Push the user to the error page if the API returns an unsuccessful response.
    this.statistics = await api.getWorkoutStatistics(this.$route.params.date).catch(() => {
      this.$router.push('Error')
    })
  }
})
</script>