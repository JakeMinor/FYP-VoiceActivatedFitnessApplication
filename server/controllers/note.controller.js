const NoteBusiness = require('../business/note.business')
const noteBusiness = new NoteBusiness()

/**
 * Create a note for a completed workout.
 * @returns A 201 response and the note which has been added.
 */
exports.createNote = async (request, response) => {
 noteBusiness.createNote(request.params.id, request.body)
   .then((note) => {response.status(201).send(note)})
   .catch((error) => {response.status(error.status).send({message: error.message})})
}