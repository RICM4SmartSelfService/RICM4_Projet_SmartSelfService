import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './menu.html';


/*
Template.menu.helpers ({

  errorMessage = function () {
    return Session.get("error");
  }

});
*/
Template.menu.rendered = function (){

  if(Session.get("err") != undefined || Session.get("err") != "") {
    $('#error').text(Session.get("err"));
    Session.set("err", "");
  } else {
    $("#error").text("kdjlqsd");
  }

};

Template.menu.events ({

  'click #menu-logoff': function(e){
    e.preventDefault();
    Accounts.logout();
    Router.go("/");
  }

});
