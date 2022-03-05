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
    /**
     * Formats the workout stats to be added to the calendar at the completed date with a label attached which says the name of the workout.
     */
    formatAttributes() {
      this.$data.attributes = Object.keys(this.workouts).map((date) => {
        return {
          bar: this.randomiseColour(),
          dates: new Date(date),
          popover: {
            label: this.workouts[date][0].Workout.name
          }
        }
      })
    },
    /**
     * Gets a random colour to use for the bar underneath the date
     **/
    randomiseColour() {
      const colours = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink']
      return colours[Math.floor(Math.random() * colours.length)];
    },
    click(date) {
      console.log(date)
    }
  },
  /**
   * Formats the workouts.
   */
  created() {
    this.formatAttributes()
  }
})
</script>