import { extend, setInteractionMode } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

setInteractionMode('lazy')

/**
 * Add required validation to Vee-Validate.
 */
extend('required', {
 ...required,
 message: (fieldName) => {
  return `${fieldName} is required.`
 }
})