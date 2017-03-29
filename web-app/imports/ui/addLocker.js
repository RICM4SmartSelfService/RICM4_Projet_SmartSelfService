import { Template } from 'meteor/templating';
import './addLocker.html';
import { Lockers } from '../api/lockers.js';
import { Session } from 'meteor/session';

Template.added.helpers({
	id(){
		return Session.get('addLocker/lastID');
	},
	URLcode(){
		return 'http://localhost:3000/unlock?id='+Session.get('addLocker/lastID');
	},
});

Template.addLocker.events({
	'submit .new-locker' : function(event, template) {
		event.preventDefault();

        var number = $('[name=number]').val();
        var place = $('[name=place]').val();
        var IP = $('[name=IP]').val();
		var newcode = Math.floor(1000 + Math.random() * 9000).toString();
		console.log(newcode);

		var ID = Lockers.insert(
			{
				number : number,
				place : place,
				IP : IP,
				object : null,
				state : "closed",
				available : true,
				code : newcode,
			}
		);
		Session.set('addLocker/lastID',ID);

		Router.go('locker.new.confirmation');
	},
});
