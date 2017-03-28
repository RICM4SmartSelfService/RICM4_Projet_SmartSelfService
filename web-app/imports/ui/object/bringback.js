import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js'
import { Objects } from '../../api/objects.js'

import "./bringback.html";


Template.BringBack.helpers({

  availableLockers() {
    return Lockers.find({ $or : [ {object : {$exists: false} }, {object : ""}, {object : null} ] });
  },

  item() {
    const idItem = Router.current().params._id;
    return Objects.findOne({_id:idItem});
  }

});

Template.BringBack.events({
	'click .ChooseLocker' : function(event){
		var lock_id = event.target.id;
		Router.go('');
	}
});
