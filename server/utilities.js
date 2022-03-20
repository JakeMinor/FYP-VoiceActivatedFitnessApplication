const httpError = require("http-errors")
const moment = require("moment")
const DataLayer = require('./datalayer/datalayer')
const dataLayer = new DataLayer('Statistics')

module.exports = class Utilities {
 /**
  * Check if the date string can be converted to a date.
  */
 static isValidDate(dateString) {
  const date = moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ", true)
  if(!date.isValid()){
   throw httpError(400, "Date string is not valid.")
  }
  return true
 }

 /**
  * Checks if the workout statistics exist in the database.
  * @param id - The ID of the statistic.
  * @returns 404 Not Found if the statistics aren't found.
  */
 static async doesStatisticExist(id) {
   const stats = await dataLayer.findAll({where: {id: id}}).catch(() => {
    throw httpError(400, "The UUID provided is in an invalid format.")
   })
  
   // Check if the stats are empty.
   if (stats.length === 0) {
    // Return a 404 telling the user there are no stats.
    throw httpError(404, "There are no stats for the requested workout.")
   }
   return true
 }
} 