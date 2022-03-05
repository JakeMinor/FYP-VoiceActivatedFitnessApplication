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
      </b-card>
    </div>

  </div>
</template>

<script lang="js">
import Vue from 'vue';
import Title from "../components/Title.vue";
import api from '../api/api'
import WorkoutFrequencyCalendar from "../components/WorkoutFrequencyCalendar.vue";

export default Vue.extend({
  name: "Dashboard",
  components: { Title, WorkoutFrequencyCalendar },
  data() {
    return {
      workouts: []
    }
  },
  async created() {
    this.$data.workouts = await api.getWorkoutStatistics()
  }
})
</script>