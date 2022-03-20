const httpError = require("http-errors")
const DataLayer = require('../datalayer/datalayer')
const Utilities = require('../utilities')
const dataLayer = new DataLayer('Notes')

module.exports = class NoteBusiness {
 async createNote(statisticId, data) {
  // Check that the statistic exists.
  await Utilities.doesStatisticExist(statisticId)
  
  // Check that the note contains data.
  validateNote(data.note)
  
  // Format the note to be inserted into the database.
  const noteToInsert = {
   statisticId: statisticId,
   note: data.note
  }

  // Insert the Note into the Notes table.
  return dataLayer.createOne(noteToInsert)
    // Catch any Database errors.
    .catch(error => {
     throw httpError(400, error.message)
    })
 }
 
 async deleteNote(noteId) {
   // Checks that the note exists.
   await doesNoteExist(noteId)
  
  // Delete the Note from the Notes table.
   return dataLayer.deleteOne(noteId)
     .catch(error => {throw httpError(500, error)})
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

/**
 * Check that the note exists in the database.
 * @param id - The ID of the note which is to be checked.
 */
async function doesNoteExist(id) {
 const notes = await dataLayer.findAll({where: {id: id}}).catch(() => {
  throw httpError(400, "The UUID provided is in an invalid format.")
 })

 // Check if the stats are empty.
 if (notes.length === 0) {
  // Return a 404 telling the user there are no stats.
  throw httpError(404, "The note you have requested doesnt exist.")
 }
}