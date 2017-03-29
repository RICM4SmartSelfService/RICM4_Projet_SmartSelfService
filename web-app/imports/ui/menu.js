import { Template } from 'meteor/templating';
import './menu.html';

Template.menu.events ({

  'click #menu-logoff': function(e){
    e.preventDefault();
    Accounts.logout();
    Router.go("home");
  }

});
