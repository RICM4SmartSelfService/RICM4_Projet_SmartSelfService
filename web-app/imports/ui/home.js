import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import './home.html';


Template.home.onCreated (function() {
		this.user = new ReactiveVar(null);
	}
);


Template.home.helpers({
	myCurrentUser(){
		Template.instance().user = Meteor.user();
		console.log(Template.instance().user);
		return Meteor.user();
	}
});
