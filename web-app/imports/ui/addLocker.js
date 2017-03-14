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
        var object = $('[name=object]').val();
        var code = $('[name=code]').val();
		
		
		var ID = Lockers.insert(
			{
				number : number,
				place : place,
				IP : IP,
				object : object,
				state : "closed",
				code : code,
			}
		);
		Session.set('addLocker/lastID',ID);
		
		Router.go('/added');
	},
});
