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
    statistics: null
  },
  data() {
    return {
      sortedStatistics: [...this.statistics]
    }
  },
  computed: {
    tableItems() {
      return this.sortedStatistics
    },
    tableHeaders() {
      return [
        { key: "set", sortable: true },
        { key: "reps", sortable: true },
        { key: "weight", sortable: true },
      ]
    }
  },
  created() {
    this.sortedStatistics = this.statistics.sort((a, b) => a.set - b.set)
  }
})
</script>