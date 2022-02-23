'use strict';
const {equipment, exercises} = require('../config/data')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Seed Equipment/Exercises then return an array of the seeded IDs to be used in the association table.
     */
    const seededEquipment = await queryInterface.bulkInsert('Equipment', equipment, { returning: ["id", "name"] })
    const seededExercises = await queryInterface.bulkInsert('Exercise', exercises, { returning: ["id", "name"] })
    
    /**
     * Create an object array containing all the related Exercises and Equipment.
     */
    const exercisesEquipment = [
      {
        ExerciseId: getIdByName('Run', seededExercises),
        EquipmentId: getIdByName('Treadmill', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Cycle', seededExercises),
        EquipmentId: getIdByName('Static bike', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Rowing', seededExercises),
        EquipmentId: getIdByName('Rower', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Skipping', seededExercises),
        EquipmentId: getIdByName('Skipping rope', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Kettle-bell swing', seededExercises),
        EquipmentId: getIdByName('Kettle-bell', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Bicep waves', seededExercises),
        EquipmentId: getIdByName('Battle ropes', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Medicine ball slam', seededExercises),
        EquipmentId: getIdByName('Medicine ball', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Squat', seededExercises),
        EquipmentId: getIdByName('Barbell', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Calf raise', seededExercises),
        EquipmentId: getIdByName('Dumbbells', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Lunge', seededExercises),
        EquipmentId: getIdByName('Dumbbells', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Pushup', seededExercises),
        EquipmentId: getIdByName('Yoga mat', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Dumbbell press', seededExercises),
        EquipmentId: getIdByName('Dumbbells', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Dumbbell press', seededExercises),
        EquipmentId: getIdByName('Bench', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Bench press', seededExercises),
        EquipmentId: getIdByName('Barbell', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Bench press', seededExercises),
        EquipmentId: getIdByName('Bench', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Cable fly', seededExercises),
        EquipmentId: getIdByName('Resistance cables', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Bent-over row', seededExercises),
        EquipmentId: getIdByName('Barbell', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Pullups', seededExercises),
        EquipmentId: getIdByName('Bar', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Banded pullups', seededExercises),
        EquipmentId: getIdByName('Bar', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Banded pullups', seededExercises),
        EquipmentId: getIdByName('Resistance bands', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Chinup', seededExercises),
        EquipmentId: getIdByName('Bar', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Shoulder press', seededExercises), 
        EquipmentId: getIdByName('Barbell', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Lateral raise', seededExercises),
        EquipmentId: getIdByName('Dumbbells', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Situp', seededExercises),
        EquipmentId: getIdByName('Yoga mat', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Plank', seededExercises),
        EquipmentId: getIdByName('Yoga mat', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Bicep curl', seededExercises),
        EquipmentId: getIdByName('Dumbbells', seededEquipment)
      },
      {
        ExerciseId: getIdByName('Tricep extensions', seededExercises),
        EquipmentId: getIdByName('Dumbbells', seededEquipment)
      }
    ]
    
    /**
     * Populate ExerciseEquipment with the related Exercises and their Equipment.
     */
    await queryInterface.bulkInsert('Exercises_Equipment', exercisesEquipment, {})
  },
  async down (queryInterface, Sequelize) {
    /**
     * Delete all data from the link table and the equipment and exercises table.
     */
    await queryInterface.bulkDelete('Exercises_Equipment', null, {});
    await queryInterface.bulkDelete('Equipment', null, {});
    await queryInterface.bulkDelete('Exercise', null, {});
  }
};

/**
 * Returns an ID from a list based on the name provided.
 * @param name - name of the exercise/equipment which is to be retrieved.
 * @param list - The list the exercise/equipment belongs to.
 * @returns UUID of the exercise/equipment.
 */
function getIdByName(name, list) {
  try{
    return list.filter(obj => obj.name === name)[0].id
  } catch(error) {
    throw Error('The item you are trying to seed doesnt exist in the seed script.')
  }
}