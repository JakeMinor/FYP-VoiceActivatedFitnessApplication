<template>
  <b-modal id="updateNoteModal" title="Update Note" centered hide-header-close>
    <template #default>
      <ValidationObserver ref="observer">
        <custom-input type="text-area" label="Note" placeholder="Updated Note..." v-model="note" rules="required"/>
      </ValidationObserver>
    </template>
    <template #modal-footer>
      <div class="d-flex justify-content-between w-100">
        <b-button variant="secondary" @click="closeModal">Cancel</b-button>
        <b-button variant="primary" @click="update">Update</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import CustomInput from "./CustomInput";
import { ValidationObserver } from "vee-validate";
import api from "../api/api";

export default Vue.extend({
  name: "UpdateNoteModal",
  components: { CustomInput, ValidationObserver },
  props: {
    selectedNote: null
  },
  data() {
    return {
      note: this.selectedNote.note
    }
  },
  methods: {
    async update() {
      // Validate the note.
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }

      // Format the note.
      const updatedNote = {
        note: this.note
      }
      
      // Send the note and Id of the note to the api.
      await api.updateNote(updatedNote, this.selectedNote.id)

      // Reset the note text.
      this.closeModal()
    },
    closeModal() {
      // Close the modal.
      this.$bvModal.hide("updateNoteModal")

      // Reset the note input.
      this.note = ''
      
      // Resets the validation.
      this.$refs.observer.reset()

      // Emit a closed event to reset the selected note.
      this.$emit('closed')
    }
  }
})
</script>