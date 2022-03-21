<template>
  <b-card>
    <div>
      <Title title="Notes" type="Subtitle" />
      <div v-if="completedWorkoutStatistics">
        <div v-if="notes.length !== 0">
          <b-alert v-for="note in notes" :key="note.id" variant="primary" class="d-flex m-0 mb-2 align-items-center" show>
            <span>{{ note.note }}</span>
            <strong class="ml-auto">{{ formatDate(note.createdAt) }}</strong>
            <b-button variant="outline-primary" class="ml-2" @click="deleteNote(note.id)"><b-icon icon="trash"></b-icon></b-button>
            <b-button variant="outline-primary" class="ml-2" v-b-modal.updateNoteModal @click="selectedNote = note"><b-icon icon="pencil"></b-icon></b-button>
          </b-alert>
        </div>
        <div v-else>
          <b-alert class="text-center" variant="secondary" show>You have written no notes for this workout, why not add some!</b-alert>
        </div>
      </div>
      <ValidationObserver ref="observer">
        <div class="d-flex">
          <custom-input id="Add-Note" label="Note"
                        placeholder="Add Note..." rules="required"
                        v-model="note" @keypress.enter="createNote"></custom-input>
          <b-button class="h-50 mt-4 ml-2" @click="createNote" variant="primary">Send</b-button>
        </div>
      </ValidationObserver>
      <update-note-modal id="updateNoteModal" v-if="selectedNote" :selected-note="selectedNote" @closed="selectedNote = null"/>
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
import UpdateNoteModal from "@/components/UpdateNoteModal";

export default Vue.extend({
  name: "Notes",
  components: {UpdateNoteModal, Title, ValidationObserver, CustomInput },
  data() {
    return {
      completedWorkoutStatistics: null, // The statistics of the selected workout which notes will be attached to.
      selectedNote: null,
      note: '' // The note which is to be added.
    }
  },
  props: {
    completedWorkoutDate: String // The Date of the completed workout.
  },
  computed: {
    notes() {
      return this.completedWorkoutStatistics[0].Notes
    }
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
      const valid = await this.$refs.observer.validate()
      if(!valid) {
        return
      }
      
      // Format the note.
      const noteToInsert = {
        note: this.note
      }
      
      // Send the note and Id of the statistic to the api.
      await api.createNote(noteToInsert, this.completedWorkoutStatistics[0].id)
      
      // Reset the note text.
      this.note = ''
      this.$refs.observer.reset();
      await this.getNotes()
    },
    async deleteNote(noteId) {
      this.$bvModal.msgBoxConfirm("Are you sure you would like to delete this note?", {
        title: "Delete Note",
        okTitle: "Yes",
        cancelTitle: "No",
        footerClass: 'justify-content-between',
        centered: true
      }).then((answer) => {
        if(answer === true){
          api.deleteNote(noteId).then(() => {
            this.getNotes()
          })
        }
      }) 
      .catch(() => {})
    },
    async modalClosed() {
      await this.getNotes()
    },
    async getNotes() {
      this.completedWorkoutStatistics = await api.getWorkoutStatistics(this.completedWorkoutDate)
    }
  },
  async created() {
    // Get the completed workout statistics to add notes to.
    await this.getNotes()
  }
})
</script>