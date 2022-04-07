<template>
  <b-card>
    <b-table :fields="tableHeaders" :items="tableItems" small striped>
      <template #head(weight)>
        Weight Lifted
      </template>
      <template #cell(weight)="cell">
        {{ cell.item.weight === null ? `0kg` : `${cell.item.weight}kg` }}
      </template>
      <template #head(reps)>
        Completed Reps
      </template>
      <template #cell(reps)="cell">
        {{ cell.item.reps === null ? `0 reps` : `${cell.item.reps} reps` }}
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "StatisticDetails",
  props: {
    // The statistic which is to be displayed in the table.
    statistics: null
  },
  data() {
    return {
      // Stores the statistic sorted by the set number.
      sortedStatistics: [...this.statistics]
    }
  },
  computed: {
    /**
     * Returns the statistic table items.
     */
    tableItems() {
      return this.sortedStatistics
    },
    /**
     * Return a list of headings for the table specifying if they are sortable fields.
     */
    tableHeaders() {
      return [
        { key: "set", sortable: true },
        { key: "reps", sortable: true },
        { key: "weight", sortable: true },
      ]
    }
  },
  /**
   * Sorts the statistics in descending order.
   */
  created() {
    this.sortedStatistics = this.statistics.sort((a, b) => a.set - b.set)
  }
})
</script>