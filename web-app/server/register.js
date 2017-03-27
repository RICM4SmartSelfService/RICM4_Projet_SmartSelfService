import {Accounts} from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  console.log(options);
  if (options.profile)
    user.profile = options.profile;
  return user;
});

Meteor.publish("userData", function () {
	return Meteor.users.find({_id: this.userId},
		{fields: {'actions': 1}});
});
