import { Template } from 'meteor/templating';
import './menu.html';

Template.menu.events ({

  'click #menu-logoff': function(){
    Accounts.logout();
    Router.go("/");
  }

});
