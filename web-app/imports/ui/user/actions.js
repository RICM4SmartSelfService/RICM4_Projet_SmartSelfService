import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js';
import { Objects } from '../../api/objects.js';

import './actions.html';

Template.actions.helpers({
	actions() {
		var Users = Accounts.users;
		var IDuser = Meteor.userId();
		console.log(Users.findOne({_id : IDuser}).actions);
		return Users.findOne({_id : IDuser}).actions;
	}
});
