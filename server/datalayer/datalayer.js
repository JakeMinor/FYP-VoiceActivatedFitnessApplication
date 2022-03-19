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
    .catch(error => {return error})
 }

 /**
  * Find the first item which matches the filter.
  * @param filter - database query filter.
  * @returns Model which matched the filter.
  */
 async findOne(filter) {
  return this.model.findOne(filter) 
    .catch(error => {return error})
 }

 /**
  * Create multiple items in the database.
  * @param data - the data which is to be inserted.
  * @returns the created data.
  */
 async bulkCreate(data) {
  return this.model.bulkCreate(data)
    .catch(error => {return error})
 }
}