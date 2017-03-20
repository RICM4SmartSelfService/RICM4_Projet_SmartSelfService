import { Template } from 'meteor/templating';
import './unlock.html';
import { Lockers } from '../api/lockers.js';
//import { Session } from 'meteor/session';

var locker;

Template.unlock.onCreated(function() {
  this.lastError = new ReactiveVar(null);
  this.success = new ReactiveVar(null);
});


Template.unlock.helpers({
  locker() { 
	var id = Router.current().params.id;
	locker = Lockers.findOne({_id: id});
	return locker;
  },
  errorMessage : function() {
    return Template.instance().lastError.get();
  },
  successful : function() {
    return Template.instance().success.get();
  }
});

Template.unlock.events({
	'submit .codeForm' : function(event, template) {
		event.preventDefault();
		// If the code is the right one unlock, else display error message
		if(event.target.code.value.localeCompare(locker.code)==0){
			template.success.set(true);
			console.log("Correct");
			template.lastError.set(null);
		} else {
			template.lastError.set("Wrong code");
		}
	},
});
