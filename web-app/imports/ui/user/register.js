import { Template } from 'meteor/templating';

import './register.html';

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
        var firstname = $('[name=firstname]').val();
        var lastname = $('[name=lastname]').val();
        if(password !== password2) {
          alert("Les mots de passe ne correspondent pas.");
        } else {
          Accounts.createUser({
              //username: username,
              email: email,
              password: password,
              profile : {
                firstname: firstname,
                lastname: lastname
              },
              roles : [
                'user'
              ],
              actions : []
          }, function(error){
            if(error != undefined) {
              alert(error)
            } else {
              Router.go("/login");
            }
          });
        }

    }
});
