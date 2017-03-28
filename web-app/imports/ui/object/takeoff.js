import { Template } from 'meteor/templating';
import './takeoff.html';
import { Lockers } from '../../api/lockers.js';
import { Objects } from '../../api/objects.js';
import { Accounts } from 'meteor/accounts-base';

Template.takeoff.helpers({
	locker() {
		var id = Router.current().params.id;
		return Lockers.findOne({_id : id});
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
		var id = Router.current().params.id;
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

		// Adding the code into teh pending actions of the user
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

		// Going to the next page
		Router.go('/takeoff/'+id+'/reserved');
	},
});
