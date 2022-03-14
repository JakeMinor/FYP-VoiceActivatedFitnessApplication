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
 constructor() {
  this.baseUrl = "http://localhost:3000/v1"
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
 
 async getWorkoutStatistics() {
  return (await axios.get(`${this.baseUrl}/statistic/`, {withCredentials: true})
   .catch(error => throwToast(error.message))).data
 }
}

export default new Api()