require('dotenv').config({path: __dirname + '/./../../.env'}) //Get custom environment variables from .env file

module.exports = {
 /**
  * DB Configuration for the development environment
  */
 development: {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "FYP-Fitness-Application",
  host: "127.0.0.1",
  dialect: "postgres"
 }
}