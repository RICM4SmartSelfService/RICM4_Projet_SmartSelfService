import { Template } from 'meteor/templating';
import { Lockers } from '/imports/api/lockers.js'
import { Objects } from '/imports/api/objects.js'

import "./bringback.html";


Template.BringBack.helpers({

  availableLockers() {
    return Lockers.find({available : true});
  },

  item() {
    const idItem = Router.current().params._id;
    return Objects.findOne({_id:idItem});
  },

});

Template.BringBack.events({
	'click .ChooseLocker' : function(event){
		const locker_id = event.target.id;
    const item_id = Router.current().params._id;

    const item = Objects.findOne({_id:item_id});
    const locker = Lockers.findOne({_id:locker_id});

    if(item != undefined && item.borrower != undefined && item.borrower == Meteor.userId()) {

      if(locker != undefined && (locker.object == "" || locker.object == undefined) && locker.available == true) {
        Accounts.users.update(Meteor.userId(),
          { $push : {
            "actions" : {
              "type" : "bring back",
              "locker" : locker_id,
              "object" : item_d,
              "code" :  locker.code,
            }
          }
        });

        Lockers.update({_id:locker_id}, {$set: {available:false}});

        const d_nom = new Date();

        Objects.update({_id:item_id}, {$push: {
          "history" : {
            time : d_now,
            action : "bring back reservation",
            locker : locker_id,
            user : Meteor.userId()
          }
        }, $set : { back:true }});

        Router.go('locker.reserve' , { _id : locker_id } , { query : 'action=back' });
      } else {
        console.log(locker);
        alert("[Error] : Locker not available.");
      }
    } else {
      alert("[Error] : You are not supposed to borrow this item");
    }
	}
});

Template.BringBack.rendered = function() {

  const item_id = Router.current().params._id;
  const item = Objects.findOne({_id:item_id});
  console.log(item);
  if( item == undefined || item.back == true) {
    alert("This object can't be brought back or is already in wait to be.");
    Router.go("user.objects");
  }

}
