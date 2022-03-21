﻿import axios from 'axios'
import store from '../store/index'
import { throwToast } from "@/helper";
/**
 * Intercepts an axios requests and throws a Javascript error if the Axios requests reruns an error.
 */
axios.interceptors.response.use(response => response, (error) => {
 throw Error(error.response.data)
})


class Api {
 constructor() {
  this.baseUrl = process.env.NODE_ENV === "production" ? "https://fyp-voice-activated-fitness.herokuapp.com/v1" : "http://localhost:3000/v1"
 }
 
 async getUser(token) {
    await axios.get(`https://api.amazon.com/user/profile?access_token=${token}`).then((response) => {
     const user = {
      email: response.data.email,
      name: response.data.name
     }
     store.dispatch('setUser', { token: token, user: user})
    }).catch(error => throwToast(error.message))
 }
 
 async authenticate() {
  window.location.href = `${this.baseUrl}/auth/login`
 }

 async signOut() {
  return (await axios.get(`${this.baseUrl}/auth/logout`, {withCredentials: true}))
 }
 
 async getAllWorkoutStatistics() {
  return (await axios.get(`${this.baseUrl}/statistic/`, {withCredentials: true})
   .catch(error => throwToast(error.message))).data
 }
 
 async getWorkoutStatistics(date) {
  return (await axios.get(`${this.baseUrl}/statistic/${date}`, {withCredentials: true, })
    .catch(error => throwToast(error.message))).data
 }
 
 async createNote(note, statisticId) {
  return (await axios.post(`${this.baseUrl}/note/${statisticId}`, note, {withCredentials: true})
    .catch(error => throwToast(error.message))).data
 }
 
 async updateNote(note, noteId) {
  return (await axios.put(`${this.baseUrl}/note/${noteId}`, note, {withCredentials: true})
    .catch(error => throwToast(error.message))).data
 }
 
 async deleteNote(noteId) {
  return (await axios.delete(`${this.baseUrl}/note/${noteId}`, {withCredentials: true})
    .catch(error => throwToast(error.message)))
 }
}

export default new Api()