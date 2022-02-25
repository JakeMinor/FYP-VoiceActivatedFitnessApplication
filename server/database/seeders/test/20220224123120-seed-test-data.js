'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Create test data to be seeded.
     */
    const testEquipment = [{
      name: "Test Equipment"
    }]
    const testExercises = [{
      name: "Test Exercise",
      information: "Test Information"
    }]
    const testWorkouts = [{
      name: "Test Workout"
    }]
    
    /**
     * Seed Equipment/Exercises/Workouts then return an array of the seeded IDs to be used in the association table.
     */
    const seededEquipment = await queryInterface.bulkInsert('Equipments', testEquipment, {returning: ["id", "name"]})
    const seededExercises = await queryInterface.bulkInsert('Exercises', testExercises, {returning: ["id", "name"]})
    const seededWorkouts = await queryInterface.bulkInsert('Workouts', testWorkouts, {returning: ["id", "name"]})

    /**
     * Create object arrays containing all the related data.
     */
    const testExercisesEquipment = [
      {
        ExerciseId: getIdByName('Test Exercise', seededExercises),
        EquipmentId: getIdByName('Test Equipment', seededEquipment)
      }
    ]
    const testWorkoutsExercises = [
      {
        WorkoutId: getIdByName('Test Workout', seededWorkouts),
        ExerciseId: getIdByName('Test Exercise', seededExercises),
        Reps: 15,
        Sets: 3,
        RestTimeInSeconds: 90
      }
    ]

    /**
     * Populate link tables with the related data.
     */
    await queryInterface.bulkInsert('Exercises_Equipments', testExercisesEquipment, {})
    await queryInterface.bulkInsert('Workouts_Exercises', testWorkoutsExercises, {})
  },
  async down(queryInterface, Sequelize) {
    /**
     * Delete all data from all the tables.
     */
    await queryInterface.bulkDelete('Workouts_Exercises', null, {});
    await queryInterface.bulkDelete('Exercises_Equipments', null, {});
    await queryInterface.bulkDelete('Workouts', null, {});
    await queryInterface.bulkDelete('Equipments', null, {});
    await queryInterface.bulkDelete('Exercises', null, {});
  }
};

/**
 * Returns an ID from a list based on the name provided.
 * @param name - name of the object which is to be retrieved.
 * @param list - The list the object belongs to.
 * @returns UUID of the object.
 */
function getIdByName(name, list) {
  try {
    return list.filter(obj => obj.name === name)[0].id
  } catch (error) {
    throw Error('The item you are trying to seed doesnt exist in the seed script.')
  }
}