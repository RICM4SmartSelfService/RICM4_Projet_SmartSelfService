import { Template } from 'meteor/templating';
import { Lockers } from '../../api/lockers.js'
import { Objects } from '../../api/objects.js'

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

    const d_limit = new Date(limitDate).getTime();
    const d_now = Date.now();

    if(title != "" && description != "" && d_limit > d_now) {

      const locker_id = Router.current().params._id;

      const locker = Lockers.findOne({_id: locker_id});

      if(locker != undefined && locker.object == null) {
        const obj = Objects.insert({
          name: title,
          description : description,
          left_date : d_now,
          pickup_date : d_limit
        }, function (err) {
          if(err != undefined) {
            alert(err);
          } else {
            console.log(obj._id);
            Lockers.update(locker, {object:obj._id});
          }
        });

      } else {
        console.log("Casier non disponible");
      }

      console.log(locker);

    } else {
      alert("Champs non remplis ou date incorrecte (rentrez une date future).");
    }


  }

})
