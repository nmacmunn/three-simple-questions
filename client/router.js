/* global AccountsEntry */

Router.configure({
  layoutTemplate: "layout"
});

/**
 * Check whether the user is in the process of logging in.
 * @param  {function} pause function to pause the router
 */
var loggingIn = function (pause) {
  if (Meteor.loggingIn()) {
    pause();
  }
};

/**
 * Prevent anonymous access to pages that require signin.
 * @param  {function} pause function to pause the router
 */
var mustBeSignedIn = function (pause) {
  AccountsEntry.signInRequired(this, pause);
};

/**
 * Redirect non-admins to home if they try to access a
 * protected route.
 */
var mustBeAdmin = function () {
  var user = Meteor.user();
  if (!user || !user.profile || !user.profile.admin) {
    Router.go('home');
  }
};

/**
 * Subscribe to questions and answers prior to accessing
 * certain routes.
 */
var qAndA = function () {
  return [
    Meteor.subscribe('questions'),
    Meteor.subscribe('answers')
  ];
};

/**
 * Setup before hooks
 */
Router.onBeforeAction(loggingIn);
Router.onBeforeAction(mustBeSignedIn, {only: ['home', 'admin']});
Router.onBeforeAction(mustBeAdmin, {only: ['admin']});

/**
 * Setup subscription hooks
 */
Router.waitOn(qAndA, {only: ['home', 'admin']});

/**
 * Setup routes.
 */
Router.route('home', {path: '/'});
Router.route('admin');
