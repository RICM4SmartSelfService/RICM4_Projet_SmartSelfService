import '/imports/ui/object/bringback.js';
import '/imports/ui/object/dropoff.js';
import '/imports/ui/object/takeoff.js';
import '/imports/ui/object/deposit.js';

Router.route('/object/bringback/:_id',function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
  this.render('BringBack');
}, { name : 'object.bringback' });

Router.route('/object/dropoff/:_id',function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
  this.render('DropOffObject');
}, { name : 'object.dropoff' });

Router.route('/object/dropoff/reserved/:_id', function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('DropReserved');
}, { name : 'locker.reserve' });

Router.route('/object/deposit', function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('deposit');
}, { name : 'object.dropoff.chooseLocker' });

Router.route('/object/takeoff/:_id', function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('takeoff');
}, { name : 'object.takeoff' });

Router.route('/object/takeoff/reserved/:_id', function() {
  if(!Meteor.user()) {
    alert("Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
	this.render('reserved');
}, { name : 'object.takeoff.confirm' });
