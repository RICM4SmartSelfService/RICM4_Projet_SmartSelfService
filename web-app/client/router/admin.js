import '/imports/ui/locker/admin/dispLockers.js';
import '/imports/ui/locker/addLocker.js';

Router.route('/admin/lockers', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("Vous devez être admin pour accéder à cette page.");
    Router.go('user.login');
  }
  this.render('dispLockers');
}, { name : 'admin.lockers.display' });


Router.route('/locker/new', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("Vous devez être admin pour accéder à cette page.");
    Router.go('user.login');
  }
	this.render('AddLocker');
}, { name : 'locker.new' });

Router.route('/locker/confirmation', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("Vous devez être admin pour accéder à cette page.");
    Router.go('user.login');
  }
	this.render('added');
}, { name : 'locker.new.confirmation' });
