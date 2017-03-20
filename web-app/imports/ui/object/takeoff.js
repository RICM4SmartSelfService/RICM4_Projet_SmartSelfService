import { Template } from 'meteor/templating';
import './takeoff.html';
import { Lockers } from '../../api/lockers.js';

Template.takeoff.helpers({
	locker() {
		var id = Router.current().params.id;
		return Lockers.findOne({_id : id});
	}
});

Template.reserved.helpers({
	locker() {
		var id = Router.current().params.id;
		return Lockers.findOne({_id : id});
	}
});

Template.takeoff.events({
	'click .Reserve' : function(event){
		console.log(event.target.id);
		var id = event.target.id;
		Lockers.update({_id : id}, $set : [{available : false}]);
		
		
		Router.go('/takeoff/'+id+'/reserved');
	},
});
