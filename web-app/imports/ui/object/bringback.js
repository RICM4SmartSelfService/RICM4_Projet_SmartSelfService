import { Template } from 'meteor/templating';
import { Lockers } from '/imports/api/lockers.js'
import { Objects } from '/imports/api/objects.js'

import "./bringback.html";


Template.BringBack.helpers({

  /**
  * @returns a list of available lockers
  */
  availableLockers() {
    return Lockers.find({
      available : true,
      object : null,
    });
  },

  /**
  * @returns the item currently concerned by the bring back
  */
  item() {
    const idItem = Router.current().params._id;
    return Objects.findOne({_id:idItem});
  },

});

Template.BringBack.events({

  /**
   * When the user choose the locker he wants to bring back his object
   */
  'click .ChooseLocker' : function(event){

    const locker_id = event.target.id;
    const item_id = Router.current().params._id;

    /* Load the item and the locker */
    const item = Objects.findOne({_id:item_id});
    const locker = Lockers.findOne({_id:locker_id});

    if(item != undefined && item.borrower != undefined && item.borrower == Meteor.userId()) { // verify if the item exists and currently belongs to you

      if(locker != undefined && (locker.object == "" || locker.object == undefined) && locker.available == true) { // verify if the locker is actually available

        /* Add the bring back action to the user */
        Accounts.users.update(Meteor.userId(),
        { $push : {
          "actions" : {
            "type" : "bring back",
            "locker" : locker_id,
            "object" : item_id,
            "code" :  locker.code,
          }
        }
      });

      /* Update de locker to asign it to the future action */
      Lockers.update({_id:locker_id}, {
        $set: {
          object : item_id,
          available : false,
          pending : "bring back",
          who : Meteor.userId()
        }});

        const d_now = new Date();

        /* update the history of the item */
        Objects.update({_id:item_id}, {$push: {
          "history" : {
            time : d_now,
            action : "bring back reservation",
            locker : locker_id,
            user : Meteor.userId()
          }
        }, $set : { bringback : true }});

        Router.go('locker.reserve' , { _id : locker_id } , { query : 'action=back' }); // redirect to the confirmation
      } else {
        //console.log(locker);
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
  //console.log(item);
  if( item == undefined || item.back == true) {
    alert("This object can't be brought back or is already in wait to be.");
    Router.go("user.objects");
  }

}
