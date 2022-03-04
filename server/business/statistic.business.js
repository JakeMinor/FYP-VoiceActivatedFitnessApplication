const httpError = require("http-errors")
const DataLayer = require('../datalayer/datalayer')
const dataLayer = new DataLayer('Statistics')

module.exports = class StatisticBusiness {
 async createWorkoutStatistics(user, workoutStatistics) {
  // Format the workout statistics to be inserted into the database.
  const statistics = workoutStatistics.map((stat) => ({
   workoutId: workoutStatistics.workoutId,
   user: user,
   exerciseId: stat.exerciseId,
   set: stat.set,
   weight: stat.weight,
   reps: stat.reps
  }))
  
  // Validates that all the required data is present.
  validateWorkoutStatistics(statistics)
  
  // Insert the Statistics into the Statistics table.
  return dataLayer.bulkCreate(statistics)
    // Catch any Database errors.
    .catch(error => {
      throw httpError(500, error.message)
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
  if (!(statistic.workoutId && statistic.exerciseId && statistic.set && statistic.weight && statistic.reps)) {
   throw httpError(400, 'Workout Statistic data is missing.')
  }
 })
}