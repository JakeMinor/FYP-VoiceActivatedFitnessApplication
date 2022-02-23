import DataLayer from '../datalayer/datalayer'
import Exercise from '../database/models/exercise'
const DataLayer = new DataLayer('workout')

module.exports = class WorkoutBusiness {
 async getWorkoutByName(name) {
  return DataLayer.findOne({ where: { name: name }, include: Exercise()})
 }
}