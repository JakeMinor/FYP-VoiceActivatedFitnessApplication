const chai = require('chai')
const auth = require('../../router/router.middleware')
const sinon = require('sinon')
const should = chai.should()
chai.use(require('chai-http'))

let server

const baseUrl = '/v1/note'

describe('Notes Tests', () => {
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
  * Tests for the DeleteNote controller.
  */
 context('Delete Note', () => {
  it('Should return 200 and delete the note.', async () => {
   // Arrange
   const noteId = "718b29ae-31b7-4e73-beb7-48553d65df65"
   const statisticUrl = '/v1/statistic'
   const completedWorkoutDate = "2022-03-05T20:13:00.670Z"

   // Act
   const result = await chai.request(server).delete(`${baseUrl}/${noteId}`).send()
   const updatedNotes = await chai.request(server).get(`${statisticUrl}/${completedWorkoutDate}`).send()

   // Assert
   result.should.have.status(200)
   updatedNotes.body[0].Notes.should.have.lengthOf(0)
  })

  it('Should return 400 if the statisticId is an invalid UUID.', async () => {
   // Arrange
   const invalidNoteId = "I DONT EXIST IN THE DATABASE"
   const expectedError = "The UUID provided is in an invalid format."

   // Act
   const result = await chai.request(server).delete(`${baseUrl}/${invalidNoteId}`).send()

   // Assert
   result.should.have.status(400)
   result.body.message.should.equal(expectedError)
  })

  it('Should return 404 if the statistic isnt found.', async () => {
   // Arrange
   const invalidNoteId = "74bee173-0969-4b5d-8eb4-e0c8f2383995"
   const expectedError = "The note you have requested doesnt exist."

   // Act
   const result = await chai.request(server).delete(`${baseUrl}/${invalidNoteId}`).send()

   // Assert
   result.should.have.status(404)
   result.body.message.should.equal(expectedError)
  })
 })
})
 
 /**
  * Tests for the CreateNote controller.
  */
 context('Create Note', () => {
  it('Should return 201 and the created note.', async () => {
   // Arrange
   const statisticId = "421b6080-cadc-4641-9689-f09835034318"
   const noteToInsert = {
    note: "Test note 123"
   }
   
   // Act
   const result = await chai.request(server).post(`${baseUrl}/${statisticId}`).send(noteToInsert)

   // Assert
   result.should.have.status(201)
   result.body.statisticId.should.equal(statisticId)
   result.body.note.should.equal(noteToInsert.note)
  })

  it('Should return 400 if the note is missing.', async () => {
   // Arrange
   const statisticId = "421b6080-cadc-4641-9689-f09835034318"
   const expectedError = "Note is missing."
   const noteToInsert = {
    note: null
   }

   // Act
   const result = await chai.request(server).post(`${baseUrl}/${statisticId}`).send(noteToInsert)

   // Assert
   result.should.have.status(400)
   result.body.message.should.equal(expectedError)
  })
  
  it('Should return 400 if the statisticId is an invalid UUID.', async () => {
   // Arrange
   const invalidStatisticId = "I DONT EXIST IN THE DATABASE"
   const expectedError = "The UUID provided is in an invalid format."
   const noteToInsert = {
    note: "Test note 123"
   }

   // Act
   const result = await chai.request(server).post(`${baseUrl}/${invalidStatisticId}`).send(noteToInsert)

   // Assert
   result.should.have.status(400)
   result.body.message.should.equal(expectedError)
  })

  it('Should return 404 if the statistic isnt found.', async () => {
   // Arrange
   const invalidStatisticId = "74bee173-0969-4b5d-8eb4-e0c8f2383995"
   const expectedError = "There are no stats for the requested workout."
   const noteToInsert = {
    note: "Test note 123"
   }

   // Act
   const result = await chai.request(server).post(`${baseUrl}/${invalidStatisticId}`).send(noteToInsert)

   // Assert
   result.should.have.status(404)
   result.body.message.should.equal(expectedError)
  })
 })
 