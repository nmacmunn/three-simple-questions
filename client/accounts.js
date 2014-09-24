/* global AccountsEntry */

/**
 * Configure the AccountsEntry package to request a a full name from
 * new users when they are signing up.
 */
Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/',
    passwordSignupFields: 'EMAIL_ONLY',
    extraSignUpFields: [{
      field: "name",
      label: "Full Name",
      placeholder: "John Doe",
      type: "text",
      required: true
    }]
  });
});
