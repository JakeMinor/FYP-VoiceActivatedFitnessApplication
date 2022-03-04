require('dotenv').config({path: __dirname + '/./../../.env'}) // Get environment variables from .env file

module.exports = {
 /**
  * DB Configuration for the specified environment
  */
 development: {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "FYP-Fitness-Application-Dev",
  host: "127.0.0.1",
  dialect: "postgres",
  logging: false
 },
 test: {
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "FYP-Fitness-Application-Test",
  host: "127.0.0.1",
  dialect: "postgres",
  logging: false
 },
 production: {
  use_env_variable: "DATABASE_URL",
  dialect: "postgres"
 }
}