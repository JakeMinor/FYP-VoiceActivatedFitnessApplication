const workoutRoutes = require("./routes/workout")

/**
 * Define the different routes for the API.
 */
module.exports = (app) => {
 app.use('/workout', workoutRoutes)
}