const httpError = require("http-errors")
const moment = require("moment")
const DataLayer = require('../datalayer/datalayer')
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
  * @param completedDate - The Date the workout was completed.
  * @param user - The user who completed the workout.
  * @returns 404 Not Found if the statistics aren't found.
  */
 static async doesStatisticExist(completedDate, user) {
  const stats = await dataLayer.findAll({where: {user: user, completedDate: completedDate}})

  // Check if the stats are empty.
  if (stats.length === 0) {
   // Return a 404 telling the user there are no stats.
   throw httpError(404, "There are no stats for the requested workout.")
  }
 }
} 