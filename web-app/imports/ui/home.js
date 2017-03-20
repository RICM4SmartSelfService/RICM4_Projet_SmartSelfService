import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import './home.html';

Template.home.helpers({

  currentUser(){
    var user = Meteor.user();
		return user;
	}

});
