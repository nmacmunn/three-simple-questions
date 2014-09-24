/* global App, SimpleSchema */

/**
 * Model for question docs.
 * @constructor
 * @param {Object} doc mongo representation of a question
 */
var Question = function (doc) {
  return _.extend(this, doc);
};

/**
 * Maps response type names to corresponding SimpleSchema settings.
 * @type {Object}
 */
var types = {
  text: {
    type: String
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  date: {
    type: Date
  },
  number: {
    type: Number
  },
  checkbox: {
    type: Boolean
  }
};

/**
 * Generate a validator for an admin created question.
 * @return {SimpleSchema}
 */
Question.prototype.schema = function () {

  var self = this;
  var response = _.extend({label: self.label}, types[self.type]);

  return new SimpleSchema({
    response: response,
    questionId: {
      type: String
    },
    userId: {
      type: String
    }
  });
};

/**
 * Remove this question from the database.
 */
Question.prototype.remove = function () {
  Questions.remove(this._id);
};

/**
 * Declare the questions collection and specify a transform function to
 * convert retrieved documents into Question objects.
 * @type {Collection}
 */
var Questions = new Meteor.Collection('questions', {
  transform: function (doc) {
    return new Question(doc);
  }
});

/**
 * Define a schema for Questions so they can be validated.
 */
Questions.attachSchema(new SimpleSchema({
  type: {
    type: String,
    label: "Expected type of answer"
  },
  label: {
    type: String,
    label: "Question text"
  },
  regEx: {
    type: RegExp,
    optional: true
  }
}));

App.Questions = Questions;