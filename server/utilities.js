const httpError = require("http-errors")
const moment = require("moment")

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
} 