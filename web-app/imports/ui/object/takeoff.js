import { Template } from 'meteor/templating';
import './takeoff.html';
import { Lockers } from '/imports/api/lockers.js';
import { Objects } from '/imports/api/objects.js';
import { Accounts } from 'meteor/accounts-base';

Template.takeoff.helpers({
	locker() {
		var id = Router.current().params._id;
		console.log(id);
		var locker = Lockers.findOne({_id : id});
		console.log(locker);
		return locker;
	}
});

Template.objectInfo.helpers({
	object() {
		return Objects.findOne({_id : this.obj_id});
	},
	owner() {
		var obj = Objects.findOne({_id : this.obj_id});
		return Accounts.users.findOne({_id : obj.owner});
	}
});

Template.reserved.helpers({
	locker() {
		var id = Router.current().params._id;
		return Lockers.findOne({_id : id});
	}
});

Template.takeoff.events({
	'click .Reserve' : function(event){
		// Getting the lockers id
		var id = event.target.id;
		Lockers.update(id, {
			$set: {
				available : false,
				pending : "take",
				who : Meteor.userId()
			},
		});

		// Adding the code into the pending actions of the user
		var locker = Lockers.findOne({_id : id});
		var IDuser = Meteor.userId();
		Accounts.users.update(IDuser,
			{ $push : {
				"actions" : {
					"type" : "take",
					"locker" : id,
					"code" :  locker.code,
				}
			}
		});
		
		//Indicating this used borrowed the object
		Objects.update(locker.object,{
			$set : {borrower : IDuser}
		});
		
		// Adding the current action to the history
		const d_now = Date.now();
		Objects.update(locker.object,{
			$push : { history : {
              time : d_now,
              action : "Take off reservation",
              locker : locker._id,
              user : Meteor.userId()
			}}
		});

		// Going to the next page
		Router.go('object.takeoff.confirm', { _id : id });
	},
});
