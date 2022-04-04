<template>
  <div v-if="statistics">
    <Title :title="title" type="Page"/>
    <b-button :to="{ name: 'Completed Workouts' }" variant="primary" class="w-25">Back</b-button>
    <div class="d-flex mt-3">
      <b-card class="mr-2 pr-4">
        <Title title="Workout Details" type="Subtitle" />
        <ul class="list-unstyled">
          <li class="pb-3"><strong>Date Completed:</strong> {{ completedDate }}</li>
          <li class="pb-3"><strong>Total Sets Completed:</strong> {{ totalSetsCompleted(Object.values(statistics).flat()) }} sets</li>
          <li class="pb-3"><strong>Total Reps Completed:</strong> {{ totalRepsCompleted(Object.values(statistics).flat()) }} reps</li>
          <li><strong>Total Weight Lifted:</strong> {{ totalWeightLifted(Object.values(statistics).flat()) }}kg</li>
        </ul>
      </b-card>
      <b-card class="ml-2 w-75">
        <Title title="Exercises Performed" type="Subtitle" />
        <b-table :fields="tableHeaders" :items="filteredItems" show-empty striped empty-text="No statistics could be found.">
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
          <template #cell(Exercise.name)="cell">
            {{cell.item[0].Exercise.name}}
          </template>
          <template #cell(completedSets)="cell">
            {{  `${totalSetsCompleted(cell.item)} sets` }}
          </template>
          <template #cell(completedReps)="cell">
            {{ `${totalRepsCompleted(cell.item)} reps` }}
          </template>
          <template #cell(totalTimePerformed)="cell">
            {{ totalTimePerformed(cell.item) === 0 ? 'N/A' : `${totalTimePerformed(cell.item)} seconds` }}
          </template>
          <template #cell(totalWeightLifted)="cell">
            {{ `${totalWeightLifted(cell.item)}kg` }}
          </template>
          <template #cell(actions)="cell">
            <div class="d-flex flex-column">
              <b-link class="mb-2" @click="cell.toggleDetails()">View Statistics
                <b-icon class="ml-2" :icon="cell.detailsShowing ? 'chevron-up' : 'chevron-down'" /></b-link>
            </div>
          </template>
          <template #row-details="cell">
            <statistic-details v-if="cell.item" :statistics="cell.item"></statistic-details>
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
import StatisticDetails from "../components/StatisticDetails.vue";

export default Vue.extend({
  name: "WorkoutStatistics.vue",
  components: { Title, StatisticDetails },
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
        { key: "completedSets", sortable: true },
        { key: "completedReps", sortable: true },
        { key: "totalWeightLifted", sortable: true },
        { key: "totalTimePerformed", sortable: true },
        { key: "actions", sortable: false }
      ]
    },
    /**
     * Return a list of filtered workouts based on the value in the name table filter.
     */
    filteredItems() {
      return Object.entries(this.statistics).map(exercise => exercise[1]).filter((statistic) => statistic[0].Exercise.name.includes(this.filters.name))
    },
    /**
     * Return the completed date of the workout
     */
    completedDate() {
      return formatDate(Object.values(this.statistics)[0][0].completedDate)
    },
    /**
     * Format the title of the page.
     */
    title() {
      const firstExercise = Object.values(this.statistics)[0][0]
      return `Statistics for ${firstExercise.Workout.name} completed on ${formatDate(firstExercise.completedDate)}`
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
    },
    /**
     * Return the total sets completed for the exercise/workout.
     */
    totalSetsCompleted(statistics) {
      return statistics.filter(statistic => statistic.reps !== null).length
    },
    /**
     * Return the total reps completed for the exercise/workout.
     */
    totalRepsCompleted(statistics) {
      return statistics.map(statistic => statistic.reps).reduce((a, b) => a + b, 0)
    },
    /**
     * Return the total weight lifted for the exercise/workout.
     */
    totalWeightLifted(statistics) {
      return statistics.map(statistic => statistic.weight).reduce((a, b) => a + b, 0)
    },
    /**
     * Return the total time performed for the exercise.
     */
    totalTimePerformed(statistics) {
      return statistics.map(statistic => statistic.timePerformed).reduce((a, b) => a + b, 0)
    }
  },
  async created() {
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