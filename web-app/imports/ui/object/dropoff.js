import { Template } from 'meteor/templating';

import './dropoff.html';

Template.dropOffObject.rendered = function(){
    $('.datetimepicker').datetimepicker();
};

Template.dropOffObject.events({
  'submit form' : function (event) {
    event.preventDefault();

    var title = $('[name=title]').val();
    var description = $('[name=description]').val();
    var limitDate = $('[name=limitDate]').val();


  }

})
