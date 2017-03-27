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
