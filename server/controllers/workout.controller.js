const WorkoutBusiness = require('../business/workout.business')
const workoutBusiness = new WorkoutBusiness()

/**
 * Gets all of the users completed workouts.
 * @returns A 200 response and all of the users completed workouts.
 */
exports.getCompletedWorkouts = async (request, response) => {
 workoutBusiness.getCompletedWorkouts(request.user.email)
   .then((completedWorkouts) => { response.status(200).send(completedWorkouts)})
   .catch((error) => {response.status(error.status).send({message: error.message})})
}

/**
 * Gets a workout based on its name.
 * @returns A 200 response and the workout with its related exercises and reps, sets, timeInSeconds and Rest Time.
 */
exports.getWorkoutByName = async (request, response) => {
 workoutBusiness.getWorkoutByName(request.params.name)
   .then((workout) => { response.status(200).send(workout) })
   .catch((error) => { response.status(error.status).send({message: error.message}) })
}