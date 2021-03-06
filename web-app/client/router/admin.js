import '/imports/ui/locker/admin/dispLockers.js';
import '/imports/ui/locker/admin/addLocker.js';
import '/imports/ui/admin/users.js';

Router.route('/admin/lockers', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("You have to be admin to access this page.");
    Router.go('user.login');
  }
  this.render('dispLockers');
}, { name : 'admin.lockers.display' });


Router.route('/locker/new', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("You have to be admin to access this page.");
    Router.go('user.login');
  }
	this.render('AddLocker');
}, { name : 'locker.new' });

Router.route('/locker/confirmation', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("You have to be admin to access this page.");
    Router.go('user.login');
  }
	this.render('added');
}, { name : 'locker.new.confirmation' });

Router.route('/admin/users', function() {
  if(!Meteor.user() || Meteor.user().roles.indexOf("admin") < 0) {
    alert("You have to be admin to access this page.");
    Router.go('user.login');
  }
	this.render('users');
}, { name : 'admin.users' });
