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
  
  // Insert the Statistics into the Statistics table.
  return dataLayer.bulkCreate(statistics)
    // Catch any Database errors.
    .catch(error => {
      throw httpError(500, error.message)
     })
 }
}