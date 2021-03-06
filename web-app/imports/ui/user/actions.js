import { Template } from 'meteor/templating';
import { Lockers } from '/imports/api/lockers.js';
import { Objects } from '/imports/api/objects.js';

import './actions.html';

Template.actions.helpers({

	/**
	 * @returns all the actions pending for the current user.
	 */
	actions() {
		var user = Meteor.user();
		if(user){
			if(user.actions){
				return user.actions;
			}
		}
		return [];
	},

	/**
	 * @returns the code needed to unlock a locker
	 */
	realCode(id_locker){
		var locker = Lockers.findOne({ _id : id_locker});
		if(locker) return locker.code;
		return null;
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
