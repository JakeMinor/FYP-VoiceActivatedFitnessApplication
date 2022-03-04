const workoutRoutes = require("./routes/workout")
const statisticRoutes = require("./routes/statistic")
const authRoutes = require("./routes/auth")

/**
 * Define the different routes for the API.
 */
module.exports = (app) => {
 app.use('/v1/workout', workoutRoutes)
 app.use('/v1/statistic', statisticRoutes)
 app.use('/v1/auth', authRoutes)
}