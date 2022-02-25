'use strict';
const {equipment, exercises, workouts} = require('../config/data')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Seed Equipment/Exercises/Workouts then return an array of the seeded IDs to be used in the association table.
     */
    const seededEquipment = await queryInterface.bulkInsert('Equipments', equipment, { returning: ["id", "name"] })
    const seededExercises = await queryInterface.bulkInsert('Exercises', exercises, { returning: ["id", "name"] })
    const seededWorkouts = await queryInterface.bulkInsert('Workouts', workouts, { returning: ["id", "name"] })
    
    /**
     * Create object arrays containing all the related data.
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
    const workoutsExercises = [
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Pushup', seededExercises),
        Reps: 15,
        Sets: 3,
        RestTimeInSeconds: 90
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Squat', seededExercises),
        Reps: 15,
        Sets: 3,
        RestTimeInSeconds: 120
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Pullups', seededExercises),
        Reps: 10,
        Sets: 4,
        RestTimeInSeconds: 120
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Lunge', seededExercises),
        Reps: 15,
        Sets: 3,
        RestTimeInSeconds: 60
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Shoulder press', seededExercises),
        Reps: 10,
        Sets: 3,
        RestTimeInSeconds: 60
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Calf raise', seededExercises),
        Reps: 15,
        Sets: 3,
        RestTimeInSeconds: 45
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Plank', seededExercises),
        TimeInSeconds: 60,
        Sets: 3,
        RestTimeInSeconds: 60
      },
      {
        WorkoutId: getIdByName('All body workout', seededWorkouts),
        ExerciseId: getIdByName('Run', seededExercises),
        TimeInSeconds: 60,
        Sets: 3,
        RestTimeInSeconds: 30
      }
    ]
    
    /**
     * Populate link tables with the related data.
     */
    await queryInterface.bulkInsert('Exercises_Equipments', exercisesEquipment, {})
    await queryInterface.bulkInsert('Workouts_Exercises', workoutsExercises, {})
  },
  async down (queryInterface, Sequelize) {
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
  try{
    return list.filter(obj => obj.name === name)[0].id
  } catch(error) {
    throw Error('The item you are trying to seed doesnt exist in the seed script.')
  }
}