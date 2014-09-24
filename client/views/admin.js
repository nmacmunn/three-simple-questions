/* global App */

/**
 * The maximum number of questions that can exist at any time.
 * @type {Number}
 */
var questionLimit = 3;

/**
 * The types of response for an admin to choose from when creating a question.
 * @type {Array}
 */
var typeOptions = [{
  label: 'Text',
  value: 'text',
}, {
  label: 'Email',
  value: 'email',
}, {
  label: 'Date',
  value: 'date'
}, {
  label: 'Number',
  value: 'number'
}, {
  label: 'Checkbox',
  value: 'checkbox'
}];

/**
 * Allows admins to modify and delete existing questions.
 * @return {Array} Existing questions
 */
Template.admin.questions = function () {
  return App.Questions.find().map(function (question, index) {
    question.index = index + 1;
    return question;
  });
};

/**
 * Create a simple object the serve as the basis for new questions.
 * Can also set a limit on the number of questions here.
 * @return {[type]} [description]
 */
Template.admin.insert = function () {
  var count = App.Questions.find().count();

  if (count >= questionLimit) {
    return;
  }

  return {
    index: count + 1,
    formId: "insert" + count
  };
};

Template.updateQuestion.typeOptions = typeOptions;
Template.insertQuestion.typeOptions = typeOptions;

Template.admin.events({
  /**
   * Delete questions.
   */
  'click button.remove': function () {
    this.remove();
  }
});