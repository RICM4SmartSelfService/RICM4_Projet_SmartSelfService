import './users.html';
import { Template } from 'meteor/templating';

Template.users.helpers({

	/**
	 * @returns the list of all the users
	 */
	users(){
		return Accounts.users.find({});
	},

	/**
	 * @returns if the user identified by the _id id is admin
	 */
	isadmin(id){
		var user = Accounts.users.findOne({
			_id : id,
			roles : { "$in" : ["admin"]}
		});
		return user!=null;
	},

	/**
	 * checks is the user is the current one
	 */
	notme(id){
		return id!=Meteor.userId();
	}

});

Template.users.events({

	/**
	 * makes the user admin
	 */
	'click .makeAdmin' : function(event){
		var user_id = event.target.id;

		Accounts.users.update({ _id : user_id}, {
			$push : {
				roles : "admin"
		}});
	},

	/**
	 * removes the user from the admins
	 */
	'click .removeAdmin' : function(event){
		var user_id = event.target.id;

		Accounts.users.update({ _id : user_id}, {
			$pull : {
				roles : "admin"
		}});
	}

});
