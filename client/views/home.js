/* global App */

/**
 * Allows the user to see their answers when all questions are complete.
 * @return {Cursor}
 */
Template.home.answers = function () {
  return App.Answers.find();
};

/**
 * Returns the first available question that has not been answered by
 * the current user.
 * @return {Question}
 */
Template.home.unanswered = function () {
  var answered = App.Answers.find().map(function (answer) {
    return answer.questionId;
  });

  var unanswered = App.Questions.findOne({_id: {$nin: answered}});

  return unanswered;
};

Template.home.events({
  /**
   * Removes all existing answers so that the user can restart from
   * the beginning.
   */
  'click button.restart': function () {
    App.Answers.find().forEach(function (answer) {
      answer.remove();
    });
  }
});