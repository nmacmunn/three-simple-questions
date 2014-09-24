/**
 * Make every user an admin (for now)
 * @param  {Object} options The options passed to Accounts.createUser
 * @param  {Object} user    Contains a proposed user object with all the
 *                          automatically generated fields required for
 *                          the user to log in
 * @return {Object}         Document to insert into users collection
 */
Accounts.onCreateUser(function (options, user) {
  user.profile = {
    admin: true
  };
  return user;
});