const httpError = require("http-errors")
const axios = require("axios")
require('dotenv').config()

module.exports = {
 async isAuthenticated(request, response, next) {
  // Verify the token in the request.
  verifyToken(request)
    .then((user) => {

     // Check that a user has been returned.
     if(!user){
      // Throw 401 error if there is no user.
      throw httpError(401, 'The provided token is invalid or has expired.')
     }

     // Save the user to the session.
     request.user = {
      displayName: user.name,
      email: user.email
     }
     
     // Call the next method to allow the request to hit the correct controller.
     next()
    })
    .catch((error) => {
     // Catch and return the 401 error with the relevant error message.
     return response.status(error.status).send(error.message)
    })
 }
}

async function verifyToken(request) {
 try {
  // Get the token from the cookie header in the request.
  const token = request.headers.cookie.split("=")[1]
  
  // Call the amazon profile link to verify the token is valid and get the user information.
  return(await axios.get(`https://api.amazon.com/user/profile?access_token=${token}`)).data ?? null
 } catch(error) {
  // Throw 401 error if the token is invalid.
  throw httpError(401, 'The provided token is invalid or has expired.')
 }
}