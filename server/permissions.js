/* global App */

/**
 * Is the user authenticated and an admin?
 * @param  {String}  userId
 * @return {Boolean}
 */
var isAdmin = function (userId) {
  var user = Meteor.users.findOne(userId);
  return user && user.profile && user.profile.admin;
};

/**
 * Allow admins to do whatever they want with Questions.
 */
App.Questions.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});

/**
 * Is the user authenticated and owner of the document?
 * @param  {String}  userId
 * @param  {Object}  doc    mongo document
 * @return {Boolean}
 */
var isOwner = function (userId, doc) {
  return userId && (userId === doc.userId);
};

/**
 * Allow Answer owners to do whatever with their own documents
 */
App.Answers.allow({
  insert: isOwner,
  update: isOwner,
  remove: isOwner
});