import { Template } from 'meteor/templating';

import './dropoff.html';

Template.dropOffObject.rendered = function(){
    $('.datetimepicker').datetimepicker({
      format:'MM-DD-YYYY HH:mm:ss'
    });

    //console.log(Router.current().params);
};

Template.dropOffObject.events({
  'submit form' : function (event) {
    event.preventDefault();

    var title = $('[name=title]').val();
    var description = $('[name=description]').val();
    var limitDate = $('[name=limitDate]').val();

    var d_limit = new Date(limitDate).getTime();

    if(title != "" && description != "" && d_limit > Date.now()) {

    } else {
      alert("Champs non remplis ou date incorrecte (rentrez une date future).");
    }


  }

})
