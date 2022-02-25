const chai = require('chai')
const server = require('../../app')
const should = chai.should()

const baseUrl = '/workout/'

chai.use(require('chai-http'))

describe('Workout Integration Tests', () => {
 /**
  * Tests for the FindWorkoutByName Controller.
  */
 context('Find Workout By Name', () => {
  it('Should return a 200 response and a the correct workout', async () => {
   //Arrange
   const workoutName = "Test Workout"
   const expectedExerciseName = "Test Exercise"
   
   //Act
   const result = await chai.request(server).get(`${baseUrl}${workoutName}`)
   console.log(result)
   
   //Assert
   result.should.have.status(200)
   result.body.name.should.equal(workoutName)
   result.body.Exercises.should.be.lengthOf(1)
   result.body.Exercises[0].name.should.equal(expectedExerciseName)
  })
 })
})