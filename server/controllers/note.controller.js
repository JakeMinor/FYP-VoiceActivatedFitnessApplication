const NoteBusiness = require('../business/note.business')
const noteBusiness = new NoteBusiness()

exports.createNote = async (request, response) => {
 noteBusiness.createNote(request.params.id, request.body)
   .then((note) => {response.status(201).send(note)})
   .catch((error) => {response.status(error.status).send({message: error.message})})
}