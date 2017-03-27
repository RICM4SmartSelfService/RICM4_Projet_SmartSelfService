import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js'
import { Objects } from '../../api/objects.js'

import './own.html';

Template.MyObjectsList.rendered = function(){

  var myObjs = Objects.find({owner : Meteor.userId()}).fetch();
  console.log(myObjs);

};
