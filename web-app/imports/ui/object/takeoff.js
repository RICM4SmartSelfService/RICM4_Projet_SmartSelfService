import { Template } from 'meteor/templating';
import './takeoff.html';
import { Lockers } from '../../api/lockers.js';
import { Accounts } from 'meteor/accounts-base';

Template.takeoff.helpers({
	locker() {
		var id = Router.current().params.id;
		return Lockers.findOne({_id : id});
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
			$set: {available : false, "pending" : "take"},
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
