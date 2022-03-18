const httpError = require("http-errors")
const DataLayer = require('../datalayer/datalayer')
const Utilities = require('../utilities')
const Workout = require('../database/models')['Workouts']
const Exercise = require('../database/models')['Exercises']
const dataLayer = new DataLayer('Statistics')

module.exports = class StatisticBusiness {
 async getAllWorkoutStatistics(user) {
  const stats = await dataLayer.findAll({
   where: {user: user}, // Filter by the signed in user. 
   attributes: ['id', 'user', 'set', 'weight', 'reps', 'completedDate'], // Remove the exerciseId and workoutId from the statistics model.
   include: [ Workout, Exercise] // Populate the Workout and Exercise data by the Ids on the statistics model.
  }).catch(error => {
   console.log("ERROR", error)
   throw httpError(500, error.message)
  }) //Catch any Database errors.

  // Group the statistics by their completion date.
  return stats.reduce((groups, item) => ({
   ...groups,
   [item.completedDate.toISOString()]: [...(groups[item.completedDate.toISOString()] || []), item]
  }), {});
 }
 
 async getWorkoutStatistics(user, completedDate) {
  // Check the date string is a valid date.
  Utilities.isValidDate(completedDate)
  
  // Get the stats for the workout from the database.
  const stats = await dataLayer.findAll({
   where: {user: user, completedDate: completedDate},
   attributes: ['id', 'user', 'set', 'weight', 'reps', 'completedDate'], // Remove the exerciseId and workoutId from the statistics model.
   include: [Workout, Exercise] // Populate the Workout and Exercise data by the Ids on the statistics model.
  }).catch(error => {
   throw httpError(500, error.message)
  }) //Catch any Database errors.
  
  // Check if the stats are empty.
  if(stats.length === 0){
   // Return a 404 telling the user there are no stats.
   throw httpError(404, "There are no stats for the requested workout.")
  } else {
   // Return the stats.
   return stats
  }
 }
 
 async createWorkoutStatistics(user, workoutStatistics) {
  // Format the workout statistics to be inserted into the database.
  const statistics = workoutStatistics.map((stat) => ({
   workoutId: stat.workoutId,
   user: user,
   exerciseId: stat.exerciseId,
   set: stat.set,
   weight: stat.weight,
   reps: stat.reps,
   completedDate: Date.now()
  }))
  
  // Validates that all the required data is present.
  validateWorkoutStatistics(statistics)
  
  // Insert the Statistics into the Statistics table.
  return dataLayer.bulkCreate(statistics)
    // Catch any Database errors.
    .catch(error => {
      throw httpError(400, error.message)
     })
 }
}

/**
 * Checks if every workout statistic in the array contains all the relevant information.
 * @param workoutStatistics - Array of workout statistic objects.
 * @returns 404 Bad Request Error if any of the objects are missing data.
 */
function validateWorkoutStatistics(workoutStatistics) {
 workoutStatistics.every(statistic => {
  if (!(statistic.workoutId && statistic.exerciseId && statistic.set && statistic.reps)) {
   throw httpError(400, 'Workout Statistic data is missing.')
  }
 })
}