'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Equipment', [
      {
        name: "Run",
        information: "Indoor running is a cardiovascular exercise where the trainee uses a treadmill to run for an extended period of time."
      },
      {
        name: "Cycle",
        information: "Indoor cycling is a cardiovascular exercise where the trainee uses a static bike to cycle for an extended period of time."
      },
      {
        name: "Rowing",
        information: "Static rowing is a cardiovascular exercise where the trainee uses a static rowing machine to row for an extended period of time."
      },
      {
        name: "Skipping",
        information: "Skipping is a cardiovascular exercise where the trainee hops over a skipping rope for an extended period of time."
      },
      {
        name: "KettleBell Swing",
        information: "A Kettle Bell Swings is a cardiovascular exercise where the trainee stands shoulder width apart and swings the kettle bell between their knees and eye level whilst maintaining a solid posture."
      },
      {
        name: "Bicep Waves",
        information: "A Bicep Wave is a cardiovascular exercise where the trainee stands with their feet shoulder width apart with battle ropes and waves the ropes as fast as possible."
      },
      {
        name: "Medicine Ball Slam",
        information: "A Medicine Ball Slam is a cardiovascular exercise where the trainee picks up the medicine ball over their head and then slams the ball into the ground, the trainee then picks the ball up and returns to the starting position."
      },
      {
        name: "Squat",
        information: "A squat is a movement performed either with weight or bodyweight where the trainee lowers their hips back from a standing position to a sitting position and then stands back up again."
      },
      {
        name: "Calf Raise",
        information: "A Calf Raise is a movement performed either with weight or bodyweight. The trainee stands with their feet shoulder width apart and stands on their tip toes. After a brief pause, the trainee then returns to the starting position."
      },
      {
        name: "Lunge",
        information: "A lunge is a movement perfomed eigher with weight or bodyweight. The trainee stands with their feet should width apart and then steps backwards and lowers themselves until their knee is nearly touching the floor. After a brief pause, the trainee then steps forward returning to the starting position."
      },
      {
        name: "Pushup",
        information: "A pushup is a bodyweight movement where the trainee starts from a prone position and pushs the floor away from them, resulting in the trainees arms being locked out. To complete the movement, the trainee returns to the prone position."
      },
      {
        name: "Dumbbell Press",
        information: "A Dumbbell Press is a strength exercise performed using dumbbells and a bench. The trainee aligns the angle with the area of the chest they would like to target, then lays back on the bench with their arms fully locked out and the dumbbells above their head. The trainee then brings the dumbbells down the chest, after a pause to contract the muscles effectively. The trainee presses the dumbbells back to the starting position."
      },
      {
        name: "Bench Press",
        information: "Bench Press is a strength exercise performed using a bench and a barbell. The trainee lays back on the bench and grips the bar around shoulder width apart. Once in this position, the trainee then presses the bar up to remove it from the stand and lowers the bar down to their chest. After a brief pause, the trainee then presses the bar back to the starting position."
      },
      {
        name: "Cable Fly",
        information: "A Cable Fly is a strength exercise performed using resistance cables. The trainee sets the height of the cables in correlation to the area of the chest they would like to target. The trainee then grabs the handles and stands with one foot in front of the other and pulls the cables with a slight bend in the arm until they meet in the middle of the trainees chest. After a brief pause, the trainee slowly returns the starting position."
      },
      {
        name: "Bent-over Row",
        information: "A Bent-over Row is a strength exercise performed using a barbell which targets the back. The trainee starts the movement by aligning their knees to the bar so that when they look down the barbell is positioned around the middle of their feet. Then the trainee hinges at their hips and grabs the bar at around shoulder width apart. Once in this position with a straight back and maintaining a bend in their knees, the trainee drives the bar to the top of their abs feeling a squeeze in the back. The trainee then slowly drops the bar returning to the starting position."
      },
      {
        name: "Pullups",
        information: "A Pullup is an upper-body exercise where the trainee hangs from a bar with their palms facing away from them and pulls themselves up so that the bar touches the trainees chest."
      },
      {
        name: "Chinup",
        information: "A Chinup is an upper-body exercise where the trainee hangs from the bar with their palms facing them and pulls themselves up so that the bar touches the trainees chest."
      },
      {
        name: "Shoulder Press",
        information: "A Shoulder Press is a strength exercise performed using a barbell which targets the shoulders. The trainee stands with their feet shoulder width apart with the barbell on a stand around chest height. The trainee then grips the barbell around shoulder width apart and stands with their chest underneath the barbell. From here, the trainee lifts the bar off the stand and presses the bar above their head maintaining a straight back and their core engaged. After a brief pause, the trainee lowers the bar back down to their chest."
      },
      {
        name: "Lateral Raise",
        information: "A Lateral Raise is a strength exercise performed using a dumbbell or resistance cables which targets the shoulders. The trainee stands with the dumbbells or cables by their side and then raises their arms so that their body is in a T shape. From here, the trainee lowers the dumbbells or cables back down to the starting position."
      },
      {
        name: "Situp",
        information: "A Situp is a core exercise where the trainee lays on a yoga mat facing the ceiling and then squeezes their core so that their shoulders raise from the floor."
      },
      {
        name: "Plank",
        information: "A Plank is a core exercise where the trainee lays on a yoga mat with their elbows under their shoulders, hands flat on the floor and core engaged."
      },
      {
        name: "Bicep Curl",
        information: "A Bicep Curl is a strength exercise performed using dumbbells. The trainee starts with the dumbbells down by their side and then brings the dumbbells up to their shoulders by bending their elbows."
      },
      {
        name: "Tricep Extensions",
        information: "A Tricep Extension is a strength exercise performed using dumbbells or cables. The trainee starts the dumbbells directly overhead, they then fully extend both arms and lower the weight down behind the head and lower at the elbows."
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
