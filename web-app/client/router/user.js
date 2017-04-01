import '/imports/ui/object/own.js';
import '/imports/ui/user/actions.js';

Router.route('/user/objects',function() {
  if(!Meteor.user()) {
    alert("You have to be connected to perform this action.");
    Router.go('user.login');
  }
  this.render('MyObjectsList');
}, {name : 'user.objects'});


Router.route('/user/actions', function(){
  if(!Meteor.user()) {
    alert("You have to be connected to perform this action.");
    Router.go('user.login');
  }
	this.render('Actions');
}, { name : 'user.actions' });
