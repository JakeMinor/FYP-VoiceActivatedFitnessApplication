module.exports = class DataLayer {
 constructor(modelName) {
  this.model = require(`../database/models`)[modelName] //Retrieve the model based on the model name passed in.
 }

 /**
  * Find all items which match the filter.
  * @param filter - database query filter.
  * @returns Array of the specified model.
  */
 async findAll(filter) {
  return this.model.findAll(filter)
    .catch(error => {throw error})
 }

 /**
  * Find the first item which matches the filter.
  * @param filter - database query filter.
  * @returns Model which matched the filter.
  */
 async findOne(filter) {
  return this.model.findOne(filter)
    .catch(error => {throw error})
 }

 /**
  * Create a singular item in the database.
  * @param data - the data which is to be inserted.
  * @returns the created data.
  */
 async createOne(data) {
  return this.model.create(data)
    .catch(error => {throw error})
 }

 /**
  * Create multiple items in the database.
  * @param data - the data which is to be inserted.
  * @returns the created data.
  */
 async bulkCreate(data) {
  return this.model.bulkCreate(data)
    .catch(error => {throw error})
 }

 /**
  * Delete an item based on its ID.
  * @param id - the ID of the item which is to be deleted.
  */
 async deleteOne(id) {
  return this.model.destroy({where: {id: id}})
    .catch(error => {throw error})
 }

 /**
  * Update an item based on its ID.
  * @param id - the ID of the item which is to be updated.
  * @param updatedNote - The new content for the note.
  */
  async updateOne(id, updatedNote) {
   return this.model.update(updatedNote, {where: {id: id}})
     .catch(error => {throw error})
 }
}