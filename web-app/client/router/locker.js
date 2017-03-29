import '/imports/ui/unlock.js';
import '/imports/ui/addLocker.js';

Router.route('/locker/unlock/:id', function () {
  this.render('Unlock');
}, { name : 'locker.unlock' });

Router.route('/locker/reserved/:_id', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('DropReserved');
}), { name : 'locker.reserve' };

Router.route('/locker/new', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('AddLocker');
}, { name : 'locker.new' });

Router.route('/locker/confirmation', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('added');
}, { name : 'locker.new.confirmation' });
