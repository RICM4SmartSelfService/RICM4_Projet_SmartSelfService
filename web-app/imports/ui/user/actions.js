import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js';
import { Objects } from '../../api/objects.js';

import './actions.html';

Template.actions.helpers({
	actions() {
		var user = Meteor.user();
		if(user){
			if(user.actions){
				return user.actions;				
			}
		}
		return [];
	}
});

Template.dispaction.helpers({
	locker() {
		return Lockers.findOne({ _id : this.locker_id});
	},
});

Template.dispobject.helpers({
	object() {
		return Objects.findOne({_id : this.obj_id});
	}
});

