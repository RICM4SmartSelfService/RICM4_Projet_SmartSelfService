import { Template } from 'meteor/templating';
import './deposit.html';
import { Lockers } from '/imports/api/lockers.js';


Template.deposit.helpers({

	/**
	 * @returns the available lockers
	 */
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
		var lock_id = event.target.id;
		Router.go('object.dropoff', { _id : lock_id });
	}

});
