import { Template } from 'meteor/templating';
import './search.html';
import { Lockers } from '/imports/api/lockers.js';
import { Objects } from '/imports/api/objects.js';
import { Session } from 'meteor/session';


Template.search.helpers({

  /**
   * @returns the list of lockers matching the regex
   */
  lockers() {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');

    // Returns the id of all the objects which names are in the regex
    var objects_id = Objects.find({
      $and : [
        { name : regexp },
        { block : { $ne : true} },
      ]}).map(function(a){return a._id;});

    var not_blocked = Objects.find({
      $and : [
        {block : { $ne : true}},
        {owner : { $ne : Meteor.userId()}}
      ]}).map(function(a){return a._id;});

    // Searches in the locker name, number and content but only if it has an object that is pickable (available)
    var res =  Lockers.find({
      $and : [
        { available : true},
        { object : { $exists: true, $ne: null, $in : not_blocked } },
        { $or : [ // Search for either one of the 3
          {place : regexp},
          {number : regexp},
          {object : { $in : objects_id } } // Object with name
        ]}
      ]});
      return res.fetch();
  },

  /**
   * @returns the pickup date expected for an object
   */
  getPickupDate(object_id) {
    const date = new Date(Objects.findOne({_id : object_id}).pickup_date);
    return date.getDay() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
  },

});

Template.search.events({

  /**
   * launchs the search when the form is sent
   */
  'submit .query': function(event) {
    // Prevents the browser from recharging
    event.preventDefault();
    // Puts the query in the session
    Session.set('search/keyword', event.target.text.value);
  },

  /**
   * For researching as soon as the input changes
   */
  'keyup .queryTerm': function(event) {
    // Puts the query in the session
    Session.set('search/keyword', event.target.value);
  },

  /**
   * When we click on the takeoff button, takes you to the next page for confimation
   */
  'click .Goto' : function(event){
    var id = event.target.id;
    Router.go('object.takeoff', { _id : id });
  },

});
