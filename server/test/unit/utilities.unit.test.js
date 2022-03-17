const Utilities = require("../../utilities")
const chai = require("chai")
const expect = chai.expect

describe('isValidDate Unit Tests', () => {
 it("Should return true if the date string is a valid ISO string", () => {
  // Arrange
  const validISOString = "2022-03-01T20:13:00.670Z"
  
  // Act
  const result = Utilities.isValidDate(validISOString)
  
  // Assert
  result.should.equal(true)
 })

 it("Should return 400 and error message if the date string isnt an ISO string", () => {
  // Arrange
  const dateString = "2022-03-01"

  // Act/Assert
  expect(() => Utilities.isValidDate(dateString)).to.throw('Date string is not valid.')
 })


 it("Should return 400 and error message if the date string isnt valid", () => {
  // Arrange
  const invalidDateString = "INVALIDDATESTRING"
  
  // Act/Assert
  expect(() => Utilities.isValidDate(invalidDateString)).to.throw('Date string is not valid.')
 })
})