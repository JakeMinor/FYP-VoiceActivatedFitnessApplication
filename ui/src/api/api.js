﻿import axios from 'axios'
import store from '../store/index'
/**
 * Intercepts an axios requests and throws a Javascript error if the Axios requests reruns an error.
 */
axios.interceptors.response.use(response => response, (error) => {
 throw Error(error.response.data)
})


class Api {
 constructor() {
  this.baseUrl = "http://localhost:3000/v1"
 }
 
 async getUser(token) {
    await axios.get(`https://api.amazon.com/user/profile?access_token=${token}`).then((response) => {
     const user = {
      email: response.data.email,
      name: response.data.name
     }
     console.log(user)
     store.dispatch('setUser', { token: token, user: user})
    }).catch(error => {
      this.$bvToast.toast(error.message, {
       title: 'Error',
       variant: 'danger',
       solid: true
      })
    })
 }
 
 async authenticate() {
  window.location.href = `${this.baseUrl}/auth/login`
 }
 
 async getWorkoutStatistics() {
  return (await axios.get(`${this.baseUrl}/statistic/`, {withCredentials: true})
   .catch(error => {
     this.$bvToast.toast(error.message, {
      title: 'Error',
      variant: 'danger',
      solid: true
     })
  })).data
 }
}

export default new Api()