import { Template } from 'meteor/templating';

import './register.html';

Template.register.events({

  /**
  * form verification for the registration
  */
  'submit form': function(event){
    event.preventDefault();

    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var password2 = $('[name=password2]').val();
    var firstname = $('[name=firstname]').val();
    var lastname = $('[name=lastname]').val();

    if(password.length < 3) {
      alert("Password is too short.");
    } else {
      if(password !== password2) {
        alert("Passwords are not matching.");
      } else {

        /* insertion of the datas in the users collection */
        Accounts.createUser({
          email: email,
          password: password,
          profile : {
            firstname: firstname,
            lastname: lastname
          },
          roles : [
            'user' // by default, the role is simple user
          ],
          actions : [] // create actions in order to avoid some errors
        }, function(error){
          if(error != undefined) {
            alert(error)
          } else {
            Router.go("user.login"); // redirect the user when he successes to register
          }
        });
      }
    }
  }

});
