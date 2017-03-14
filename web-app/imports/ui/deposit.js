import { Template } from 'meteor/templating';
import './deposit.html';
import { Lockers } from '../api/lockers.js';


Template.deposit.helpers({
	freeLockers(){
		console.log('coucou');
		return Lockers.find({ $or : [ {object : {$exists: false} }, {object : ""}, {object : null} ] });
	},	
});


// http://stackoverflow.com/questions/23120475/implementing-a-selectable-list-of-items-in-meteor-0-8-0-blaze
Template.deposit.events({
	'click .Goto' : function(event){
		console.log(event);
	}
});
