const httpError = require("http-errors")
const DataLayer = require('../datalayer/datalayer')
const Exercises = require(`../database/models`)['Exercises']
const Statistics = require('../database/models')['Statistics']
const dataLayer = new DataLayer('Workouts')

module.exports = class WorkoutBusiness {
 async getWorkoutByName(name) {
  return dataLayer.findOne({
   where: {name: name}, //Filter the workouts by the name provided.
   include: [{ 
    model: Exercises, //Include an array of all the exercises related to the workout in the WorkoutsExercises table.
    attributes: ['id', 'name', 'information'], //Retrieve the Id, Name and Information of the exercise.
    through: {
     attributes: ['Reps', 'Sets', 'TimeInSeconds', 'RestTimeInSeconds'] //Retrieve the Reps, Sets, TimeInSeconds, RestTimeInSeconds which are listed in the WorkoutsExercises table. 
    }
   }]
  }).catch(error => {throw httpError(500, error.message)}) //Catch any Database errors.
 }
 
 async getCompletedWorkouts(user) {
  return dataLayer.findAll({
   where: {user: user},
   include: [{
    model: Statistics
   }]
  })
 }
}