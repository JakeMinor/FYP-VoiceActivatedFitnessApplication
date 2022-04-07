const httpError = require("http-errors")
const DataLayer = require('../datalayer/datalayer')
const Exercises = require(`../database/models`)['Exercises']
const dataLayer = new DataLayer('Workouts')

module.exports = class WorkoutBusiness {
 async getWorkoutByName(name) {
  return dataLayer.findOne({
   where: {name: name}, //Filter the workouts by the name provided.
   include: [{ 
    model: Exercises, //Include an array of all the exercises related to the workout in the WorkoutsExercises table.
    attributes: ['id', 'name', 'information'], //Retrieve the Id, Name and Information of the exercise.
    through: {
     //Retrieve the Reps, Sets, TimeInSeconds, RestTimeInSeconds which are listed in the WorkoutsExercises table.
     attributes: ['Reps', 'Sets', 'TimeInSeconds', 'RestTimeInSeconds']  
    }
   }]
  }).catch(error => {throw httpError(500, error.message)}) //Catch any Database errors.
 }
}