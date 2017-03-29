import {Accounts} from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  console.log(options);
  if (options.profile) {
    user.profile = options.profile;
  }
  user.roles = options.roles;
  user.actions = options.actions;
  return user;
});

Meteor.publish("userData", function () {
	return Meteor.users.find({},
		{fields: {'actions': 1, 'roles' : 1, 'emails' : 1}});
});

Meteor.users.allow({
    insert: function (userId, doc) {
           //Normally I would check if (this.userId) to see if the method is called by logged in user or guest
           //you can also add some checks here like user role based check etc.,
           return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
           //similar checks like insert
           return true;
    },
    remove: function (userId, doc) {
           //similar checks like insert
           return true;
    },
});
