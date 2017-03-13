import { Template } from 'meteor/templating';
import './unlock.html';
import { Lockers } from '../api/lockers.js';
import { Session } from 'meteor/session';

var locker;

Template.unlock.helpers({
  locker() { 
	var id = Router.current().params.query.id;
	locker = Lockers.findOne({_id: new Mongo.ObjectID(id)});
	return locker;
  },
});

Template.unlock.events({
	'submit .codeForm' : function(event) {
		event.preventDefault();
		if(event.target.code.value.localeCompare(locker.code)==0){
			console.log("Correct");
		}
	},
});
