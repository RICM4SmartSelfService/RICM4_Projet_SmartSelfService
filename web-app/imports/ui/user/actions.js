import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js';
import { Objects } from '../../api/objects.js';

import './actions.html';

Template.actions.helpers({
	actions() {
		var user = Meteor.user();
		if(user){
			return user.actions;
		}
	}
});
