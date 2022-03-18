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
  console.log("REQUEST HEADERS", request.headers)
  console.log("REQUEST HEADER COOKIES", request.headers)
  const token = request.headers.cookie.split("=")[1]
  console.log("TOKEN", token)
  
  let d = (await axios.get(`https://api.amazon.com/user/profile?access_token=${token}`)).data ?? null
  console.log(d)
  return d
 } catch(error) {
  console.log("ERROR", error)
  throw httpError(401, 'The provided token is invalid or has expired.')
 }
}