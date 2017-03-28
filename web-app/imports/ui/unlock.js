import { Template } from 'meteor/templating';
import './unlock.html';
import { Lockers } from '../api/lockers.js';

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
			console.log(locker);
			console.log(locker.who);
			var user = Accounts.users.findOne({_id : locker.who});
			
			// Updating the locker
			if(locker.pending == "take"){
				Lockers.update(id, { $set : {"object" : null}});
			}
			
			if(user){
				// Removing the action from the user's list
				Accounts.users.update({ _id : user._id},
					  { $pull: { "actions" : { "locker" : id}}});
			}
            // We free the locker
			Lockers.update(id, {
				$set : {
					"available" : true,
					"pending" : null,
					"who" : null
			}});
			
			// Randomly generate a new code
			var newcode =(Math.floor(1000 + Math.random() * 9000)).toString();			
			Lockers.update(id, { // Adding it into the DB
				$set : {"code" : newcode}
			});
			
			 // Create device
			var device = new Device(locker.ip);
			// Set pin 6 to output
			device.pinMode(5, "OUTPUT");
			// Put set pin 6 to HIGH
			device.digitalWrite(5, 1);
			
			setTimeout(function(){
				device.digitalWrite(5, 0);
			}, 2000);
			
		} else {
			// Setting an error to display it to the user
			template.lastError.set("Wrong code");
		}
	},
});


