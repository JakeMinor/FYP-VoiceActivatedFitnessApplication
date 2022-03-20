const Utilities = require("../../utilities")
const chai = require("chai")
const expect = chai.expect

describe('isValidDate Unit Tests.', () => {
 it("Should return true if the date string is a valid ISO string.", () => {
  // Arrange
  const validISOString = "2022-03-01T20:13:00.670Z"
  
  // Act
  const result = Utilities.isValidDate(validISOString)
  
  // Assert
  result.should.equal(true)
 })

 it("Should return an error message if the date string isnt an ISO string.", () => {
  // Arrange
  const dateString = "2022-03-01"
  const expectedError = 'Date string is not valid.'

  // Act/Assert
  expect(() => Utilities.isValidDate(dateString)).to.throw(expectedError)
 })
 
 it("Should return an error message if the date string isnt valid.", () => {
  // Arrange
  const invalidDateString = "INVALIDDATESTRING"
  const expectedError = 'Date string is not valid.'

  // Act/Assert
  expect(() => Utilities.isValidDate(invalidDateString)).to.throw(expectedError)
 })
})

describe('doesStatisticExist Unit Tests.', () => {
 it("Should not return an error message when the statistics are found.", () => {
  // Arrange
  const statisticId = "421b6080-cadc-4641-9689-f09835034318"

  // Act/Assert
  expect(() => Utilities.doesStatisticExist(statisticId)).not.to.throw(Error)
 })
})