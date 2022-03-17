<template>
  <div>
    <Title title="Completed Workouts" type="Page" />
    <b-table :fields="tableHeaders" :items="filteredItems" show-empty empty-text="No workouts could be found.">
      <template #head(name)="head">
        {{head.label}}
        <b-input id="nameFilter" v-model="filters.name" size="sm" class="mt-2" placeholder="Name..."></b-input>
      </template>
      <template #head(numberOfExercisesCompleted)="head">
        {{ head.label }}
        <b-input id="numberOfExercisesCompletedFilter" type="number" min="0" oninput="validity.valid||(value='');" v-model="filters.exercisesCompleted" size="sm" class="mt-2" placeholder="Exercises completed..."></b-input>
      </template>
      <template #head(completedDate)="head">
        {{ head.label }}
        <date-picker id="dateCompletedFilter" v-model="filters.completedDate" mode="date" :model-config="config">
          <template v-slot="{ inputValue, inputEvents }">
            <b-input :value="inputValue" v-on="inputEvents" size="sm" class="mt-2" placeholder="Completed Date..."/>
          </template>
        </date-picker>
      </template>
      <template #head(actions)="head">
        <div class="d-flex flex-column">
          {{ head.label }}
          <b-button class="mt-3 text-left p-0 font-weight-normal" variant="link" @click="resetFilters">Reset filters</b-button>
        </div>
      </template>
      <template #cell(completedDate)="cell">
        {{ formatDate(cell.item.completedDate) }}
      </template>
      <template #cell(actions)="cell">
        <b-link :to="{name: 'Workout Statistics', params: { date: cell.item.completedDate }}">View Details</b-link>
      </template>
    </b-table>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import Title from "../components/Title.vue";
import api from '../api/api'
import { formatDate } from '@/helper';
import { DatePicker } from 'v-calendar'

export default Vue.extend({
  name: "CompletedWorkouts.vue",
  components: { Title, DatePicker },
  data() {
    return {
      workouts: [], // The users workouts.
      filters: {
        name: '',
        exercisesCompleted: '',
        completedDate: ''
      },
      config: {
        type: 'string',
        mask: 'iso'
      }
    }
  },
  methods: {
    formatDate,
    resetFilters() {
      this.filters.name = ''
      this.filters.exercisesCompleted = ''
      this.filters.completedDate = ''
    }
  },
  computed: {
    tableHeaders() {
      return [
        { key: "name", sortable: true },
        { key: "completedDate", sortable: true},
        { key: "numberOfExercisesCompleted", sortable: true},
        { key: "actions", sortable: false }
      ]
    },
    filteredItems() {
      return this.$data.workouts.filter((workout) =>
          workout.name.includes(this.filters.name) &&
          workout.completedDate.split('T')[0].includes(this.filters.completedDate.split('T')[0]) &&
          (this.filters.exercisesCompleted !== '' ? this.filters.exercisesCompleted === workout.numberOfExercisesCompleted : true ))
    }
  },
  /**
   * Gets the users workout statistics from the api.
   */
  async mounted() {
    const workoutData = await api.getAllWorkoutStatistics()
    for(const date in workoutData){
      const workout = workoutData[date][0]
      this.$data.workouts.push({
       name: workout.Workout.name,
       completedDate: workout.completedDate,
       numberOfExercisesCompleted: workoutData[date].length
      })
    }
  }
})
</script>