﻿const chai = require('chai')
const auth = require('../../router/router.middleware')
const sinon = require('sinon')
const should = chai.should()
chai.use(require('chai-http'))

let server

const baseUrl = '/v1/statistic'

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
  * Tests for the GetCompletedWorkouts controller.
  */
 context('Get Completed Workouts', () => {
  it('Should return 200 and the completed workouts.', async () => {
   // Arrange
   const expectedUser = 'TestUser@email.com'
   const expectedReps = 15
   const expectedSets = 1
   const expectedWeights = 0
   const expectedExerciseName = "Test Exercise"
   const expectedWorkoutName = "Test Workout"

   // Act
   const result = await chai.request(server).get(`${baseUrl}`).send()
   const stats = result.body[Object.keys(result.body)[0]]
   
   // Assert
   result.should.have.status(200)
   stats[0].user.should.equal(expectedUser)
   stats[0].set.should.equal(expectedSets)
   stats[0].weight.should.equal(expectedWeights)
   stats[0].reps.should.equal(expectedReps)
   stats[0].Workout.name.should.equal(expectedWorkoutName)
   stats[0].Exercise.name.should.equal(expectedExerciseName)
  })
 })

 /**
  * Tests for the getWorkoutStatistics controller.
  */
 context('Get Workout statistics', () => {
  it('Should return 200 and the stats for the specified workout.', async () => {
   // Arrange
   const completedDate = "2022-03-05T20:13:00.670Z"
   const expectedUser = 'TestUser@email.com'
   const expectedReps = 15
   const expectedSets = 1
   const expectedWeights = 0
   const expectedExerciseName = "Test Exercise"
   const expectedWorkoutName = "Test Workout"

   // Act
   const result = await chai.request(server).get(`${baseUrl}/${completedDate}`).send()
   const stats = result.body[Object.keys(result.body)[0]]
   // Assert
   result.should.have.status(200)
   console.log(stats)
   stats.should.be.lengthOf(1)
   stats[0].completedDate.should.equal(completedDate)
   stats[0].user.should.equal(expectedUser)
   stats[0].set.should.equal(expectedSets)
   stats[0].weight.should.equal(expectedWeights)
   stats[0].reps.should.equal(expectedReps)
   stats[0].Workout.name.should.equal(expectedWorkoutName)
   stats[0].Exercise.name.should.equal(expectedExerciseName)
  })
 
  it('Should return 400 and an error message if the date string isnt valid.', async () => {
   // Arrange
   const invalidDate = "INVALIDDATESTRING"

   // Act
   const result = await chai.request(server).get(`${baseUrl}/${invalidDate}`).send()

   // Assert
   result.should.have.status(400)
   result.body.message.should.equal("Date string is not valid.")
  })
  
  it('Should return 404 and no stats for a specified workout which doesnt exist.', async () => {
   // Arrange
   const completedDate = "2022-03-01T20:13:00.670Z"

   // Act
   const result = await chai.request(server).get(`${baseUrl}/${completedDate}`).send()

   // Assert
   result.should.have.status(404)
   result.body.message.should.equal("There are no stats for the requested workout.")
  })
 })
 
 /**
  * Tests for the CreateWorkoutStatistics Controller.
  */
 context('Create Workout Statistics', () => {
  it('Should return 201 and the created workout statistics.', async () => {
   // Arrange
   const workoutStatistics = {
     workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
     exercises: [
      {
       exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
       setNumber: 1,
       weight: null,
       completedReps: 15
      },
      {
       exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
       setNumber: 2,
       weight: 15,
       completedReps: 10
      }
     ]
   }
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
   const workoutStatistics = {
    workoutId: null,
    exercises: [
     {
      exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
      setNumber: 1,
      weight: null,
      completedReps: 15
     },
     {
      exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
      setNumber: 2,
      weight: 15,
      completedReps: 10
     }
    ]
   }
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })

  it('Should return 400 and an error message if the exerciseId is missing.', async () => {
   // Arrange
   const workoutStatistics = {
    workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
    exercises: [
     {
      exerciseId: null,
      setNumber: 1,
      weight: null,
      completedReps: 15
     }
    ]
   }
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })

  it('Should return 400 and an error message if the set number is missing.', async () => {
   // Arrange
   const workoutStatistics = {
    workoutId: "c98b0aa7-73ef-40ad-a366-6b3e36634fdb",
    exercises: [
     {
      exerciseId: "74bee173-0969-4b5d-8eb4-e0c8f2383995",
      setNumber: null,
      weight: null,
      completedReps: 15
     }
    ]
   }
   const expectedError = "Workout Statistic data is missing."


   // Act
   const result = await chai.request(server).post(`${baseUrl}`).send(workoutStatistics)

   // Assert
   result.should.have.status(400)
   result.body.message.should.be.equal(expectedError)
  })
 })
})