import { Template } from 'meteor/templating';
import './unlock.html';
import { Lockers } from '/imports/api/lockers.js';
import { HTTP } from 'meteor/http';

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
			
			var id = Router.current().params.id;
			var locker = Lockers.findOne({_id: id});
			
			var url = 'http://' + locker.IP + '/mode/5/o';
			console.log(url);
			HTTP.get(url,{},function() {
				url = 'http://' + locker.IP + '/display/5/1';
				HTTP.get( url,{},function(){
					template.success.set(true);
					template.lastError.set("");
					setTimeout(function(){
						url = 'http://' + locker.IP + '/display/5/0';
						HTTP.get(url,{},function(){});
					}, 2000);
				});				
			} );
			
			
			
			//console.log(locker);
			//console.log(locker.who);
			var user = Accounts.users.findOne({_id : locker.who});

      //TODO edit this part when esp8266 is setup + update histo of object
			// Updating the locker
			if(locker.pending == "take"){
				Lockers.update(id, { $set : {object : null, available : true}});
			}

			if(user){
				// Removing the action from the user's list
				Accounts.users.update({ _id : user._id},
					  { $pull: { "actions" : {locker : id}}});
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

			

		} else {
			// Setting an error to display it to the user
			template.lastError.set("Wrong code");
		}
	},
});
