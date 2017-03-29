import { Template } from 'meteor/templating';
import './search.html';
import { Lockers } from '../api/lockers.js';
import { Objects } from '../api/objects.js';
import { Session } from 'meteor/session';


Template.search.helpers({
  lockers() {
	var regexp = new RegExp(Session.get('search/keyword'), 'i');

	// Returns the id of all the objects which names are in the regex
	var objects_id = Objects.find({ name : regexp }).map(function(a){return a._id;});


	// Searches in the locker name, number and content but only if it has an object that is pickable (available)
	return Lockers.find({
		$and : [
			{ available : true},
			{ block : { $ne : true} },
			{ object : { $exists: true, $ne: null } },
			{ $or : [ // Search for either one of the 3
				{place : regexp},
				{number : regexp},
				{object : { $in : objects_id } } // Object with name
			]}
	]});
  },

  notOwner(object_id) {
    return Objects.findOne({_id:object_id}).owner != Meteor.userId();
  }

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
	// When we click on the takeoff button, takes you to the next page for confimation
  'click .Goto' : function(event){
	console.log(event.target.id);
	var id = event.target.id;
	Router.go('object.takeoff', { _id : id });
  },
});
