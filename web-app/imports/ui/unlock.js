import { Template } from 'meteor/templating';
import './unlock.html';
import { Lockers } from '../api/lockers.js';
//import { Session } from 'meteor/session';



Template.unlock.onCreated(function() {
  this.lastError = new ReactiveVar(null);
  this.success = new ReactiveVar(null);
  this.my_locker = new ReactiveVar(null);
});


Template.unlock.helpers({
  locker() { 
	var id = Router.current().params.id;
	var res = Lockers.findOne({_id: id});
	Template.instance().my_locker.set(res);
	return res;
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
		if(event.target.code.value.localeCompare(template.my_locker.get().code)==0){
			template.success.set(true);
			template.lastError.set("");
			
			var id = Router.current().params.id;
			var locker = Lockers.findOne({_id: id});
			
			// Updating the locker
			if(locker.pending == "take"){
				
			} else if (locker.pending == "drop"){
				
			}
			var newcode =(Math.floor(1000 + Math.random() * 9000)).toString();
			Lockers.update(id, {
				$set : {"code" : newcode}
			});
			
		} else {
			template.lastError.set("Wrong code");
		}
	},
});
