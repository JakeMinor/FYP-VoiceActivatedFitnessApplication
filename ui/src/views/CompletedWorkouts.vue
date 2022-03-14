<template>
  <div>
    <Title title="Completed Workouts" type="Page" />
    <b-table :fields="tableHeaders" :items="this.$data.workouts">
      <template #cell(completedDate)="cell">
        {{ formatDate(cell.item.completedDate) }}
      </template>
      <template #cell(actions)>
        <b-link>View Details</b-link>
      </template>
    </b-table>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import Title from "../components/Title.vue";
import api from '../api/api'
import { formatDate } from '@/helper';

export default Vue.extend({
  name: "CompletedWorkouts.vue",
  components: { Title },
  data() {
    return {
      workouts: [], // The users workouts.
      filters: {
        name: '',
        exercisesCompleted: '',
        completedDate: ''
      }
    }
  },
  methods: {
    formatDate
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
  },
  /**
   * Gets the users workout statistics from the api.
   */
  async mounted() {
    const workoutData = await api.getWorkoutStatistics()
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