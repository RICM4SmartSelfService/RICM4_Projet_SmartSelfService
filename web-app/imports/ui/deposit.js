import { Template } from 'meteor/templating';
import './deposit.html';
import { Lockers } from '../api/lockers.js';


Template.deposit.helpers({
	freeLockers(){
		return Lockers.find({
			$and : [
				{available : true}, {
					$or : [
						{object : {$exists: false} },
						{object : ""},
						{object : null}
					]
				}
			]}).fetch();
	},
});


Template.deposit.events({
	'click .ChooseLocker' : function(event){
		console.log(event.target.id);
		var lock_id = event.target.id;
		Router.go('/object/dropoff/'+lock_id);
	}
});
