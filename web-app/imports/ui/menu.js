import { Template } from 'meteor/templating';
import { Objects } from '/imports/api/objects.js';
import { Lockers } from '/imports/api/lockers.js';
import './menu.html';

Template.menu.events ({

  /**
   * logout function
   */
  'click #menu-logoff': function(e){
    e.preventDefault();
    Accounts.logout();
    Router.go("home");
  }

});

Template.menu.helpers({

  /**
   * @returns the number of objets owned by the current user that are still available in a locker or are currently borrowed by someone.
   */
  nbObjAvailable() {
    const items = Objects.find({owner : Meteor.userId()}).fetch();
    var count = 0;
    for(i=0; i<items.length; i++) {
      if(items[i].history[items[i].history.length-1].action != "Got back to you.") { count++; }
    }
    return count;
  },

  /**
   * @returns the number of objects borrowed by the current user he still have to bring back.
   */
  nbBorrowObj() {
    return Objects.find({borrower : Meteor.userId()}).fetch().length;
  },

});
