const WorkoutBusiness = require('../business/workout.business')
const workoutBusiness = new WorkoutBusiness()

/**
 * Gets a workout based on its name.
 * @returns A 200 response and the workout with its related exercises and reps, sets, timeInSeconds and Rest Time.
 */
exports.getWorkoutByName = async (request, response) => {
 workoutBusiness.getWorkoutByName(request.params.name)
   .then((data) => { response.status(200).send(data) })
   .catch((error) => { response.status(error.status).send({message: error.message}) })
}