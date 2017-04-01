import { Template } from 'meteor/templating';
import { Objects } from '/imports/api/objects.js';
import { Lockers } from '/imports/api/lockers.js';
import './menu.html';

Template.menu.events ({

  'click #menu-logoff': function(e){
    e.preventDefault();
    Accounts.logout();
    Router.go("home");
  }

});

Template.menu.helpers({

  nbObjAvailable() {
    const items = Objects.find({owner : Meteor.userId()}).fetch();
    var count = 0;
    for(i=0; i<items.length; i++) {
      if(items[i].history[items[i].history.length-1].action != "Got back to you.") { count++; }
    }
    return count;
  },

  nbBorrowObj() {
    return Objects.find({borrower : Meteor.userId()}).fetch().length;
  },

});
