import { Template } from 'meteor/templating';
import './search.html';
import { Lockers } from '../api/lockers.js';
import { Session } from 'meteor/session';


Template.search.helpers({
  lockers() {	
	var regexp = new RegExp(Session.get('search/keyword'), 'i');
	// Searches in the locker name and content
	return Lockers.find({ $or : [{place : regexp},{object : regexp}] });
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
});
