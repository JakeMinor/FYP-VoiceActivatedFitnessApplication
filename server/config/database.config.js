import { Sequelize } from "sequelize"
import "dotenv/config" //Allows access to the .env file which stores the database password.

const database = "FYP" //The name of the database to be used for the project.
const user = "postgres" //The name of the user to log in (this is the default user).
const host = "localhost" //Where the database is to be hosted.
const port = 5432 //The port number of where the database is hosted.

module.exports = new Sequelize(database, user, process.env.DB_PASSWORD, {
 host,
 port,
 dialect: 'postgres', //Specify the database is a postgres database.
 logging: false //Disable logging.
})