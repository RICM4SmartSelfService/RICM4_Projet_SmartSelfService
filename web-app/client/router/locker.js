import '/imports/ui/locker/unlock.js';

Router.route('/locker/unlock/:id', function () {
  this.render('Unlock');
}, { name : 'locker.unlock' });

Router.route('/locker/reserved/:_id', function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('DropReserved');
}), { name : 'locker.reserve' };
