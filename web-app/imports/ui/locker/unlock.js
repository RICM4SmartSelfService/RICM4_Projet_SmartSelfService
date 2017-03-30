import { Template } from 'meteor/templating';
import './unlock.html';
import { Lockers } from '/imports/api/lockers.js';
import { Objects } from '/imports/api/objects.js';
import { HTTP } from 'meteor/http';

Template.unlock.onCreated(function() {
  this.lastError = new ReactiveVar(null);
  this.success = new ReactiveVar(null);
  this.my_locker = new ReactiveVar(null);
});


Template.unlock.helpers({
  locker() {
	var id = Router.current().params._id;
	console.log(id);
	var res = Lockers.findOne({_id: id});
	console.log(res);
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
			
			var id = Router.current().params._id;
			var locker = Lockers.findOne({_id: id});
			
			/*
			var url = 'http://' + locker.IP + '/mode/5/o';
			console.log(url);
			HTTP.get(url,{},function() {
				url = 'http://' + locker.IP + '/display/5/1';
				HTTP.get( url,{},function(){
					setTimeout(function(){
						url = 'http://' + locker.IP + '/display/5/0';
						HTTP.get(url,{},function(){});
					}, 2000);
				});				
			} );
			*/
			
			
			var user = Accounts.users.findOne({_id : locker.who});

			// Updating the locker
			if(locker.pending){
				const d_now = Date.now();
				if(locker.pending.localeCompare("take")==0){
					console.log('Taking');
					Lockers.update(id, {
						$set : {
							object : null,
							available : true,
							pending : null,
							who : null
					}});
					
					console.log('Update object');
					Objects.update(locker.object,{
						$push : { history : {
							  time : d_now,
							  action : "Taken off",
							  locker : locker._id,
							  user : Meteor.userId()
						}}
					});				
				} else if(locker.pending == "drop"){
					console.log('Droping');
					Lockers.update(id, {
						$set : {
							available : true,
							pending : null,
							who : null
					}});
					
					console.log('Update object');
					Objects.update(locker.object,{
						$push : { history : {
							  time : d_now,
							  action : "Droped off",
							  locker : locker._id,
							  user : Meteor.userId()
						}}
					});		
				} else if (locker.pending == "get back") {
					console.log('Getting back');
					Lockers.update(id, {
						$set : {
							object : null,
							available : true,
							pending : null,
							who : null
					}});
					
					console.log('Update object');
					Objects.update(locker.object,{
						$push : { history : {
							  time : d_now,
							  action : "Got back to you.",
							  locker : locker._id,
							  user : Meteor.userId()
						}}
					});		
					Objects.update(locker.object,{
						$set : { block : false, back : true }
					});
				} else if (locker.pending == "bring back") {
					console.log('Bringing back');
					Lockers.update(id, {
						$set : {
							available : true,
							pending : null,
							who : null
					}});
					
					console.log('Update object');
					Objects.update(locker.object,{
						$push : { history : {
							  time : d_now,
							  action : "Brought back",
							  locker : locker._id,
							  user : Meteor.userId()
						}}
					});		
					Objects.update(locker.object,{
						$set : {
							bringback : true,
							borrower : null }
					});
				}
			} else {
				console.log("No pending action");
			}

			if(user){
				// Removing the action from the user's list
				Accounts.users.update({ _id : user._id},
					  { $pull: { "actions" : {locker : id}}});
			}
			
			console.log('Free');
			// Randomly generate a new code
			var newcode =(Math.floor(1000 + Math.random() * 9000)).toString();
			Lockers.update(id, { // Adding it into the DB
				$set : {"code" : newcode}
			});

		} else if (event.target.code.value.localeCompare(template.my_locker.get().admincode)==0) {
			template.success.set(true);
			template.lastError.set("");
			
			//TODO//
			// Unlock the locker
			
			var newcode =(Math.floor(1000 + Math.random() * 9000)).toString();
			Lockers.update(id, { // Adding it into the DB
				$set : {"admincode" : newcode}
			});
		} else {
			// Setting an error to display it to the user
			template.lastError.set("Wrong code");
		}
	},
});
