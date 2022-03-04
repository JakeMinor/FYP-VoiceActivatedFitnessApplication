const StatisticBusiness = require('../business/statistic.business')
const statisticBusiness = new StatisticBusiness()

/**
 * Create a statistics for a workout.
 * @returns A 201 response and the inserted workout statistics.
 */
exports.createWorkoutStatistics = async (request, response) => {
 statisticBusiness.createWorkoutStatistics(request.user.email, request.body)
   .then((createdStatistics) => {response.status(201).send(createdStatistics)})
   .catch((error) => {response.status(error.status).send({message: error.message})})
}