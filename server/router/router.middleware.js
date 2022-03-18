const httpError = require("http-errors")
const axios = require("axios")
require('dotenv').config()

module.exports = {
 async isAuthenticated(request, response, next) {
  verifyToken(request)
    .then((user) => {

     if(!user){
      throw httpError(401, 'The provided token is invalid or has expired.')
     }

     request.user = {
      displayName: user.name,
      email: user.email
     }
     
     next()
    })
    .catch((error) => {
     return response.status(error.status).send(error.message)
    })
 }
}

async function verifyToken(request) {
 try {
  const token = request.headers.cookie.split("=")[1]
  
  return(await axios.get(`https://api.amazon.com/user/profile?access_token=${token}`)).data ?? null
 } catch(error) {
  throw httpError(401, 'The provided token is invalid or has expired.')
 }
}