import { Template } from 'meteor/templating';
import './search.html';
import { Lockers } from '../api/lockers.js';
import { Session } from 'meteor/session';


Template.search.helpers({
  lockers() {	
	var regexp = new RegExp(Session.get('search/keyword'), 'i');
	// Searches in the locker name and content but only if it has an object that is pickable
	return Lockers.find({
		$and : [
			{ available : true},
			{ object : { $exists: true, $ne: null } },
			{ $or : [
				{place : regexp},
				{object : regexp},
				{number : regexp}
			]} 
	]});
  },
});

Template.search.events({
  'submit .query': function(event) {
	// Prevents the browser from recharging
	event.preventDefault();
	// Puts the query in the session
	Session.set('search/keyword', event.target.text.value);
	
  },
  // For researching as soon as the input changes
  'keyup .queryTerm': function(event) {
	// Puts the query in the session
	Session.set('search/keyword', event.target.value);
	},
  'click .Goto' : function(event){
	console.log(event.target.id);
	var id = event.target.id;
	Router.go('/takeoff/'+id);
  },
});
