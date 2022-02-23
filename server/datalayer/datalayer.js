module.exports = class DataLayer {
 constructor(modelName) {
  this.model = require(`/server/database/models/${modelName}`)
 }
 
 async findOne(filter) {
  return this.model.findOne(filter)
    .catch(error => throw error)
 }
}