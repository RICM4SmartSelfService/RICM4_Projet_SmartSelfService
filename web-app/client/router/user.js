import '/imports/ui/object/own.js';
import '/imports/ui/user/actions.js';

Router.route('/user/objects',function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
  this.render('MyObjectsList');
}, {name : 'user.objects'});


Router.route('/user/actions', function(){
	this.render('Actions');
}, { name : 'user.actions' });
