<template>
  <div>
    <vc-calendar @dayclick="click" is-expanded :attributes="attributes" />
  </div>
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
  name: "WorkoutFrequencyCalendar",
  props: {
    workouts: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      attributes: []
    }
  },
  methods: {
    formatAttributes() {
      this.$data.attributes = Object.keys(this.workouts).map((date) => {
        return {
          bar: true,
          dates: new Date(date),
          popover: {
            label: this.workouts[date][0].Workout.name
          }
        }
      })
    },
    click(date) {
      console.log(date)
    }
  },
  created() {
    this.formatAttributes()
  }
})
</script>