const StatisticBusiness = require('../business/statistic.business')
const statisticBusiness = new StatisticBusiness()

/**
 * Gets all of the users completed workouts.
 * @returns A 200 response and all of the users completed workouts.
 */
exports.getCompletedWorkouts = async (request, response) => {
 statisticBusiness.getCompletedWorkouts(request.user.email)
   .then((completedWorkouts) => {
    response.status(200).send(completedWorkouts)
   })
   .catch((error) => {
    response.status(error.status).send({message: error.message})
   })
}

/**
 * Create a statistics for a workout.
 * @returns A 201 response and the inserted workout statistics.
 */
exports.createWorkoutStatistics = async (request, response) => {
 statisticBusiness.createWorkoutStatistics(request.user.email, request.body)
   .then((createdStatistics) => {response.status(201).send(createdStatistics)})
   .catch((error) => {
    console.log(error)
    response.status(error.status).send({message: error.message})})
}