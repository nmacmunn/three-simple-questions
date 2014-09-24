/**
 * Publish all questions to everyone.
 * @return {Cursor}
 */
Meteor.publish("questions", function () {
  return App.Questions.find();
});

/**
 * Publish answers belonging to the current user.
 * @return {Cursor}
 */
Meteor.publish("answers", function () {
  return App.Answers.find({userId: this.userId});
});