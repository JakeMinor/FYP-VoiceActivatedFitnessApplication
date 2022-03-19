const httpError = require("http-errors")
const DataLayer = require('../datalayer/datalayer')
const Utilities = require('../utilities')
const dataLayer = new DataLayer('Notes')

module.exports = class NoteBusiness {
 async createNote(user, completedDate, note) {
  // Checks the date string is a valid date.
  Utilities.isValidDate(completedDate)

  // Check that the statistic exists.
  await Utilities.doesStatisticExist(completedDate, user)
  
  // Check that the note contains data.
  validateNote(note)
  
  // Format the note to be inserted into the database.
  const noteToInsert = {
   note: note,
   workoutDate: completedDate,
   user: user
  }

  // Insert the Statistics into the Statistics table.
  return dataLayer.createOne(noteToInsert)
    // Catch any Database errors.
    .catch(error => {
     throw httpError(400, error.message)
    })
 }
}

/**
 * Check that the note contains data.
 * @param note - The note which is to be checked.
 */
function validateNote(note) {
 if (!note) {
  // Return 400 Bad Request if the note is missing.
  throw httpError(400, 'Note is missing.')
 }
}