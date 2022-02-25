module.exports = class DataLayer {
 constructor(modelName) {
  this.model = require(`../database/models`)[modelName] //Retrieve the model based on the model name passed in.
 }
 
 async findOne(filter) {
  return this.model.findOne(filter) //Find one item based on the provided filter.
    .catch(error => {return error})
 }
}