const workoutRoutes = require("./routes/workout")
const statisticRoutes = require("./routes/statistic")
const authRoutes = require("./routes/auth")
const noteRoutes = require("./routes/note")

// Swagger UI
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json')

/**
 * Define the different routes for the API.
 */
module.exports = (app) => {
 app.use('/v1/workout', workoutRoutes)
 app.use('/v1/statistic', statisticRoutes)
 app.use('/v1/auth', authRoutes)
 app.use('/v1/note', noteRoutes)
 app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}