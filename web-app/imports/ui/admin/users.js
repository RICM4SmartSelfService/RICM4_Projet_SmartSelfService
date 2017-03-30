import './users.html';
import { Template } from 'meteor/templating';

Template.users.helpers({
	users(){
		return Accounts.users.find({});
	},
	isadmin(id){
		var user = Accounts.users.findOne({ 
			_id : id,
			roles : { "$in" : ["admin"]}
		});
		return user!=null;
	},
	notme(id){
		return id!=Meteor.userId();
	}
});

Template.users.events({
	'click .makeAdmin' : function(event){
		var user_id = event.target.id;
		
		Accounts.users.update({ _id : user_id}, {
			$push : {
				roles : "admin"
		}});
	},
	'click .removeAdmin' : function(event){
		var user_id = event.target.id;
		
		Accounts.users.update({ _id : user_id}, {
			$pull : {
				roles : "admin"
		}});
	}
});
