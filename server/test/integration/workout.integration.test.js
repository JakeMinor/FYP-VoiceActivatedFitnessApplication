const chai = require('chai')
const auth = require('../../router/router.middleware')
const sinon = require('sinon')
const should = chai.should()

let server 

const baseUrl = '/v1/workout/'

chai.use(require('chai-http'))

describe('Workout Integration Tests', () => {
 beforeEach(() => {
  sinon.stub(auth, 'isAuthenticated').callsFake((request, response, next) => {
   request.user = {
    name: "Test User",
    email: "TestUser@email.com"
   }
   next()
  })

  server = require('../../app')
 })

 afterEach(() => {
  auth.isAuthenticated.restore()
 })
 /**
  * Tests for the FindWorkoutByName Controller.
  */
 context('Find Workout By Name', () => {
  it('Should return a 200 response and a the correct workout', async () => {
   // Arrange
   const workoutName = "Test Workout"
   const expectedExerciseName = "Test Exercise"
   
   // Act
   const result = await chai.request(server).get(`${baseUrl}${workoutName}`)
   
   // Assert
   result.should.have.status(200)
   result.body.name.should.equal(workoutName)
   result.body.Exercises.should.be.lengthOf(1)
   result.body.Exercises[0].name.should.equal(expectedExerciseName)
  })
 })
})