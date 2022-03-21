import axios from 'axios'
import store from '../store/index'
import { throwToast } from "@/helper";
/**
 * Intercepts an axios requests and throws a Javascript error if the Axios requests reruns an error.
 */
axios.interceptors.response.use(response => response, (error) => {
 throw Error(error.response.data)
})


class Api {
 /**
  * Set the Base url based on the environment.
  */
 constructor() {
  this.baseUrl = process.env.NODE_ENV === "production" ? "https://fyp-voice-activated-fitness.herokuapp.com/v1" : "http://localhost:3000/v1"
 }

 /**
  * Get the user using the access token.
  * @param token - The access token provided by the API.
  */
 async getUser(token) {
    await axios.get(`https://api.amazon.com/user/profile?access_token=${token}`).then((response) => {
     const user = {
      email: response.data.email,
      name: response.data.name
     }
     store.dispatch('setUser', { token: token, user: user})
    }).catch(error => throwToast(error.message))
 }

 /**
  * Redirect the user to the login page.
  */
 async authenticate() {
  window.location.href = `${this.baseUrl}/auth/login`
 }

 /**
  * Call the API to sign the user out.
  */
 async signOut() {
  return (await axios.get(`${this.baseUrl}/auth/logout`, {withCredentials: true}))
 }

 /**
  * Get all of the completed workouts from the API.
  */
 async getAllWorkoutStatistics() {
  return (await axios.get(`${this.baseUrl}/statistic/`, {withCredentials: true})
   .catch(error => throwToast(error.message))).data
 }

 /**
  * Get a specific workouts statistics.
  * @param date - The date the workout was completed.
  */
 async getWorkoutStatistics(date) {
  return (await axios.get(`${this.baseUrl}/statistic/${date}`, {withCredentials: true, })
    .catch(error => throwToast(error.message))).data
 }

 /**
  * Create a note for a workout.
  * @param note - The content of the note.
  * @param statisticId - The statistic it is to be attached to.
  */
 async createNote(note, statisticId) {
  return (await axios.post(`${this.baseUrl}/note/${statisticId}`, note, {withCredentials: true})
    .catch(error => throwToast(error.message))).data
 }

 /**
  * Update a note for a workout.
  * @param note - The content of the note.
  * @param noteId - The ID of the note which is to be updated.
  */
 async updateNote(note, noteId) {
  return (await axios.put(`${this.baseUrl}/note/${noteId}`, note, {withCredentials: true})
    .catch(error => throwToast(error.message))).data
 }

 /**
  * Delete a note from a workout.
  * @param noteId - The ID of the note which is to be deleted.
  */
 async deleteNote(noteId) {
  return (await axios.delete(`${this.baseUrl}/note/${noteId}`, {withCredentials: true})
    .catch(error => throwToast(error.message)))
 }
}

export default new Api()