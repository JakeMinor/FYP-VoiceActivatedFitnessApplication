<template>
  <b-card>
    <div>
      <Title title="Notes" type="Subtitle" />
      <div v-if="completedWorkoutStatistics">
        <b-alert v-for="note in completedWorkoutStatistics[0].Notes" :key="note.id" variant="info" class="d-flex m-0 mb-2" show>
          <div class="d-flex flex-column">
            <span>{{ note.note }}</span>
          </div>
          <strong class="ml-auto">{{ formatDate(note.createdAt) }}</strong>
        </b-alert>
      </div>
      <ValidationObserver ref="observer">
        <div class="d-flex mt-2">
          <custom-input id="Add-Note" label="Note"
                        placeholder="Add Note..." rules="required"
                        v-model="note" class="mt-4" @keypress.enter="createNote"></custom-input>
          <b-button class="h-50 mt-5 mb-3 ml-2" @click="createNote" variant="primary">Send</b-button>
        </div>
      </ValidationObserver>
    </div>
  </b-card>
</template>

<script lang="js">
import Vue from 'vue';
import Title from './Title'
import { formatDate } from "@/helper";
import { ValidationObserver } from 'vee-validate'
import CustomInput from "@/components/CustomInput";
import api from "@/api/api";

export default Vue.extend({
  name: "Notes",
  components: { Title, ValidationObserver, CustomInput },
  data() {
    return {
      completedWorkoutStatistics: null, // The statistics of the selected workout which notes will be attached to.
      note: '' // The note which is to be added.
    }
  },
  props: {
    completedWorkoutDate: String // The Date of the completed workout.
  },
  methods: {
    /**
     * Format Date function from helper.js.
     */
    formatDate,
    /**
     * Create a note for the workout.
     */
    async createNote() {
      // Validate the note.
      const valid = this.$refs.observer.validate()
      if(!valid) {
        return
      }
      
      // Format the note.
      const noteToInsert = {
        note: this.note
      }
      
      // Sned the note and Id of the statistic to the api.
      await api.createNote(noteToInsert, this.completedWorkoutStatistics[0].id)
      
      // Reset the note text.
      this.note = ''
    }
  },
  async created() {
    // Get the completed workout statistics to add notes to.
    this.completedWorkoutStatistics = await api.getWorkoutStatistics(this.completedWorkoutDate)
  }
})
</script>