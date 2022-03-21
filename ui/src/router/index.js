import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import store from '../store/index';
import api from '@/api/api'
import Error from '@/views/Error'
import CompletedWorkouts from "@/views/CompletedWorkouts";
import WorkoutStatistics from "@/views/WorkoutStatistics";
import PrivacyPolicy from "@/views/PrivacyPolicy";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/completed-workouts',
    name: 'Completed Workouts',
    component: CompletedWorkouts
  },
  {
    path: '/:date/statistics',
    name: "Workout Statistics",
    component: WorkoutStatistics
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: PrivacyPolicy
  },
  /**
   * Bounces any unrecognised routes to the error page.
   */
  {
    path: '*',
    redirect: '/error'
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
