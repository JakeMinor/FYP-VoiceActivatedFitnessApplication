import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import store from '../store/index';
import api from '@/api/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // Check if the access token cookie exists.
  if (document.cookie !== ''){
    // Get the token from the cookie.
    const token = document.cookie.split('=')[1]
    
    // Get the authenticated users details from the amazon api.
    await api.getUser(token)
    
    // If the user has been set, continue to the route.
    if(store.getters['user'] !== null) {
      next()
    } 
    // Else reauthenticate as the token has expired.  
    else { 
      await api.authenticate()
    }
  } 
  // Else authenticate with the system.
  else {
    await api.authenticate()
  }
})


export default router
