import { Template } from 'meteor/templating';
import './dispLockers.html';
import { Lockers } from '../api/lockers.js';
import { Objects } from '../api/objects.js';
import { Session } from 'meteor/session';


Template.dispLockers.helpers({
  lockers() {
	var regexp = new RegExp(Session.get('dispLockers/keyword'), 'i');
	
	// Returns the id of all the objects which names are in the regex
	var objects_id = Objects.find({ name : regexp }).map(function(a){return a._id;});
	
	
	// Searches in the locker name, number and content but only if it has an object that is pickable (available)
	return Lockers.find({
		 $or : [ // Search for either one of the 3
			{place : regexp},
			{number : regexp}, 
			{object : { $in : objects_id } } // Object with name
	]});
  },
});

Template.search.events({
  'submit .query': function(event) {
	// Prevents the browser from recharging
	event.preventDefault();
	// Puts the query in the session
	Session.set('dispLockers/keyword', event.target.text.value);

  },
  // For researching as soon as the input changes
  'keyup .queryTerm': function(event) {
	// Puts the query in the session
	Session.set('dispLockers/keyword', event.target.value);
	}
});

