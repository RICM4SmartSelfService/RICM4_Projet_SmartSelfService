import { Template } from 'meteor/templating';
import { Lockers } from '/imports/api/lockers.js'
import { Objects } from '/imports/api/objects.js'

import './own.html';

Template.MyObjectsList.helpers({

  /**
  * @returns the list of the objects owned by the user
  */
  myObjs(){
    const myObjs = Objects.find({owner : Meteor.userId()}, {sort : {"pickup_date" : -1}}).fetch();
    //console.log(myObjs);
    return myObjs;
  },

  /**
  * @returns the objects borrowed by the user
  */
  borrowedObjs() {
    const borrowedObjs = Objects.find({borrower : Meteor.userId()}, {sort : {"pickup_date" : 1}}).fetch();
    return borrowedObjs;
  },

  /**
  * @returns the last history action of an object
  */
  status(history) {
    return history[history.length-1].action;
  },

  now() {
    return new Date().getTime();
  },

  /**
  * @returns if the object is in an available locker
  */
  available(obj_id){
    var locker =  Lockers.findOne({object : obj_id})
    if(locker) return locker.available;
    return false;
  }

});

Template.MyObjectsList.events({

  /**
  * Blocks an object so that you can come back and pick it up
  */
  'click .block' : function(event){
    var id = event.target.value;
    const item = Objects.findOne({_id:id});
    if(item.owner == Meteor.userId()) {
      Objects.update({_id:id}, {
        $set: {
          block:true
        }
      });
      alert("Item locked. You'll be able to pick it up next time it's available.");
    } else {
      alert("You are not the owner of this item.")
    }
  },
  // Reserve and object for user to get back (out of the system)
  'click .getBack' : function(event){
    var id = event.target.value;
    const item = Objects.findOne({_id:id});
    if(item.owner == Meteor.userId()) {
      var locker = Lockers.findOne({object : id});
      var IDuser = Meteor.userId();
      // Add action into the user DB
      Accounts.users.update(IDuser,
        { $push : {
          "actions" : {
            "type" : "get back",
            "locker" : locker._id,
            "code" :  locker.code,
          }
        }
      });

      // Update locker
      Lockers.update(locker._id,{
        $set : {
          available : false,
          pending : "get back",
          who : IDuser,
        }
      });
      alert("You can now go take your object. The code is under Your Actions")
    } else {
      alert("You are not the owner of this item.")
    }
  }
});
