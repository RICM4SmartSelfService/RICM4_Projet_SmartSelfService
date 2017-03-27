import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js'
import { Objects } from '../../api/objects.js'

import './own.html';

Template.MyObjectsList.helpers({

  myObjs(){
    var myObjs = Objects.find({owner : Meteor.userId()}).fetch();
    console.log(myObjs);
    return myObjs;
  },

  status(history) {
    return history[history.length-1].action;
  },

  now() {
    return new Date().getTime();
  },

});

Template.MyObjectsList.events({
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
      alert("You are not owner of this item.")
    }
  }
});
