import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js'
import { Objects } from '../../api/objects.js'

import './dropoff.html';

Template.dropOffObject.rendered = function(){
    $('.datetimepicker').datetimepicker({
      format:'MM-DD-YYYY HH:mm:ss'
    });

    //console.log(Router.current().params);
};

Template.dropOffObject.helpers({
	locker(){
		const locker_id = Router.current().params._id;
		return Lockers.findOne({_id: locker_id});
	}
});

Template.dropOffObject.events({
  'submit form' : function (event) {
    event.preventDefault();

    var title = $('[name=title]').val();
    var description = $('[name=description]').val();
    var limitDate = $('[name=limitDate]').val();

    const d_limit = new Date(limitDate).getTime();
    const d_now = Date.now();

    if(title != "" && description != "" && d_limit > d_now) {

      const locker_id = Router.current().params._id;

      const locker = Lockers.findOne({_id: locker_id});

      if(locker != undefined && (locker.object == "" || locker.object == undefined)) {
        const obj = Objects.insert({
          name: title,
          description : description,
          left_date : d_now,
          pickup_date : d_limit,
          events : [
            {
              time : d_now,
              action : "reserved",
              locker : locker_id,
              user : Meteor.userId()
            }
          ]
        }, function (err) {
          if(err != undefined) {
            alert(err);
          } else {
            console.log(obj);
            Lockers.update({ _id : locker_id } ,
				{$set : {
					object : obj,
					available : false,
					pending : "drop",
					who : Meteor.userId() }
			});
          }
        });
        
        // Adding the code into the pending actions of the user
		var locker = Lockers.findOne({_id : locker_id});
		var IDuser = Meteor.userId();
		Accounts.users.update(IDuser,
			{ $push : {
				"actions" : {
					"type" : "drop",
					"locker" : locker_id,
					"code" :  locker.code,
				}
			}
		});
       
		// Display a confirmation of the dropoff reservation
        Router.go('/object/dropoff/'+locker_id+'/reserved');

      } else {
        alert("Casier non disponible");
      }

    } else {
      alert("Champs non remplis ou date incorrecte (rentrez une date future).");
    }


  }

});

Template.Dropreserved.helpers({
	locker() {
		var id = Router.current().params._id;
		return Lockers.findOne({_id : id});
	}
});
