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
      statistics: null,
      filters: {
        name: ''
      }
    }
  },
  computed: {
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
    filteredItems() {
      return this.$data.statistics.filter((statistic) => statistic.Exercise.name.includes(this.filters.name))
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
    formatDate,
    resetFilters() {
      this.filters.name = ''
    }
  },
  async mounted() {
    if(!this.$route.params.date){
      await this.$router.push("Error")
    }
    this.statistics = await api.getWorkoutStatistics(this.$route.params.date)
  }
})
</script>