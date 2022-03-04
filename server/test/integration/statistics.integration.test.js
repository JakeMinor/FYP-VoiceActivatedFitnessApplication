const chai = require('chai')
const auth = require('../../router/router.middleware')
const sinon = require('sinon')
const should = chai.should()
chai.use(require('chai-http'))

let server

const baseUrl = '/v1/statistic/'

describe('Workout Statistics Tests', () => {
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
  * Tests for the CreateWorkoutStatistics Controller.
  */
 context('Create Workout Statistics', () => {
  it('Should return 201 and the created workout statistics.', async () => {
   // Arrange
   const workoutStatistics = [
    {
     workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
     exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
     set: 1,
     weight: null,
     reps: 15,
     completedDate: Date.now().toString()
    },
    {
     workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
     exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
     set: 2,
     weight: 15,
     reps: 10,
     completedDate: Date.now().toString()
    },
   ]
   const expectedUser = "TestUser@email.com"

   
   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(201)
   result.body.should.be.lengthOf(2)
   result.body[0].user.should.equal(expectedUser)
   result.body[1].user.should.equal(expectedUser)
  })
  
  it('Should return 400 and an error message if the workoutId is missing.', async () => {
   // Arrange
   const workoutStatistics = [
    {
     workoutId: null,
     exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
     set: 1,
     weight: null,
     reps: 15,
     completedDate: Date.now().toString()
    },
   ]
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })

  it('Should return 400 and an error message if the exerciseId is missing.', async () => {
   // Arrange
   const workoutStatistics = [
    {
     workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
     exerciseId: null,
     set: 1,
     weight: null,
     reps: 15,
     completedDate: Date.now().toString()
    },
   ]
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })

  it('Should return 400 and an error message if the set number is missing.', async () => {
   // Arrange
   const workoutStatistics = [
    {
     workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
     exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
     set: null,
     weight: null,
     reps: 15,
     completedDate: Date.now().toString()
    },
   ]
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })

  it('Should return 400 and an error message if the rep number is missing.', async () => {
   // Arrange
   const workoutStatistics = [
    {
     workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
     exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
     set: 1,
     weight: null,
     reps: null,
     completedDate: Date.now().toString()
    },
   ]
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })
 })
})