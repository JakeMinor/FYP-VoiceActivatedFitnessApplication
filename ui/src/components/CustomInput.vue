<template>
  <label class="w-100 mb-0">
    {{ label }}
    <ValidationProvider :name="label" :rules="rules" v-slot="{ errors }">
      <b-form-input :type="type" v-bind="$attrs" v-on="$listeners" :class="errors.length > 0 ? 'border-danger' : ''" :placeholder="placeholder"></b-form-input>
      <span id="Error" class="text-danger">{{ errors[0] }}</span>
    </ValidationProvider>
  </label>
</template>

<script lang="js">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'

export default Vue.extend({
  name: 'CustomInput',
  components: { ValidationProvider },
  props: {
    type: String, // The type of input which is required.
    label: String, // The string to be included in the label.
    rules: String, // The validation rules which are to be applied to the input.
    placeholder: String // The string to be included in the placeholder for the input.
  }
})
</script>
