/* global App */

/**
 * Model for answer docs.
 * @constructor
 * @param {Object} doc mongo representation of an answer
 */
var Answer = function (doc) {
  return _.extend(this, doc);
};

/**
 * Find the question that this answer belongs to.
 * Pretending to be a relational database.
 * @return {Question}
 */
Answer.prototype.question = function () {
  return App.Questions.findOne(this.questionId);
};

/**
 * Remove this answer document from the mongo collection.
 */
Answer.prototype.remove = function () {
  App.Answers.remove(this._id);
};

/**
 * Declare the answers collection and specify a transform function to
 * convert retrieved documents into Question objects.
 * @type {Collection}
 */
App.Answers = new Meteor.Collection('answers', {
  transform: function (doc) {
    return new Answer(doc);
  }
});