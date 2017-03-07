import { Template } from 'meteor/templating';

import './connect.html';

Template.body.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var password2 = $('[name=password2]').val();
        if(password !== password2) {
          alert("Les mots de passe ne correspondent pas.");
        } else {
          Accounts.createUser({
              email: email,
              password: password
          }, function(error){
            alert(error)
          });
        }

    }
});
