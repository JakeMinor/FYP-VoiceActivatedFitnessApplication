<template>
  <div>
    <Title title="Dashboard" type="Page"/>
    <div class="d-flex">
      <b-card class="w-75 mr-3">
        <Title title="Workout Frequency" type="Subtitle"/>
        <workout-frequency-calendar :workouts="this.$data.workouts" v-if="this.$data.workouts"/>
      </b-card>
      <b-card class="w-50">
        <Title title="Recently Completed Workouts" type="Subtitle" />
        <div v-for="(workout, index) in this.$data.workouts" :key="workout[0].completedDate">
          <template v-if="index <= 5"></template>
          <recently-completed-workout v-else :workout-name="workout[0].Workout.name" :completed-date="workout[0].completedDate" />
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import Title from "../components/Title.vue";
import api from '../api/api'
import WorkoutFrequencyCalendar from "../components/WorkoutFrequencyCalendar.vue";
import RecentlyCompletedWorkout from "@/components/RecentlyCompletedWorkout";

export default Vue.extend({
  name: "Dashboard",
  components: { Title, WorkoutFrequencyCalendar, RecentlyCompletedWorkout },
  data() {
    return {
      workouts: null // The users workouts.
    }
  },
  /**
   * Gets the users workout statistics from the api.
   */
  async mounted() {
    this.$data.workouts = await api.getAllWorkoutStatistics()
  }
})
</script>