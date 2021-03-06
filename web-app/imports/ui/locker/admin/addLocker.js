import { Template } from 'meteor/templating';
import './addLocker.html';
import { Lockers } from '/imports/api/lockers.js';
import { Session } from 'meteor/session';

Template.added.helpers({

	id(){
		return Session.get('addLocker/lastID');
	},

	/**
	 * @returns a full unlock url
	 */
	URLcode(){
		return 'http://localhost:3000/unlock/'+Session.get('addLocker/lastID');
	},
});

Template.addLocker.events({

	/**
   * creates a locker with the data transmitted by the form
	 */
	'submit .new-locker' : function(event, template) {
		event.preventDefault();

		/* Getting all the form's data */
    var number = $('[name=number]').val();
    var place = $('[name=place]').val();
    var IP = $('[name=IP]').val();
		var newcode = Math.floor(1000 + Math.random() * 9000).toString();
		var adcode = Math.floor(1000 + Math.random() * 9000).toString();

		/* Inserting the new locker in the collection */
		var ID = Lockers.insert(
			{
				number : number,
				place : place,
				IP : IP,
				object : null,
				state : "closed",
				available : true,
				code : newcode,
				admincode : adcode,
			}
		);
		Session.set('addLocker/lastID',ID);

		Router.go('locker.new.confirmation');
	},
});
