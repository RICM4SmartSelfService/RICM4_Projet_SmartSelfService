import '../imports/ui/home.js';
import '../imports/ui/search.js';
import '../imports/ui/unlock.js';
import '../imports/ui/user/register.js';
import '../imports/ui/user/login.js';
import '../imports/ui/user/actions.js';
import '../imports/ui/addLocker.js';
import '../imports/ui/menu.js';
import '../imports/ui/deposit.js';
import '../imports/ui/object/bringback.js';
import '../imports/ui/object/dropoff.js';
import '../imports/ui/object/takeoff.js';
import '../imports/ui/object/own.js';
import '../imports/startup/accounts-config.js';

Router.route('/', function () {
  this.render('Home');
});

Router.route('/register', function () {
  if(Meteor.user() != null) {
    Router.go("/");
  }
  this.render('Register');
});

Router.route('/login', function () {
  if(Meteor.user() != null) {
    Router.go("/");
  }
  this.render('Login');
});

Router.route('/search', function () {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
  this.render('Search');
}, {name : 'search'});

Router.route('/unlock/:id', function () {
  this.render('Unlock');
});

Router.route('/addLocker', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
	this.render('AddLocker');
});

Router.route('/added', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
	this.render('added');
});

Router.route('/object/bringback/:_id',function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
  this.render('BringBack');
});

Router.route('/object',function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
  this.render('MyObjectsList');
}, {name : 'object.list'});

Router.route('/object/dropoff/:_id',function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
  this.render('DropOffObject');
});
Router.route('/locker/reserved/:_id', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
	this.render('DropReserved');
});

Router.route('/deposit', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
	this.render('deposit');
});

Router.route('/takeoff/:id', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
	this.render('takeoff');
});
Router.route('/takeoff/:id/reserved', function() {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('/login');
  }
	this.render('reserved');
});

Router.route('/actions', function(){
	this.render('Actions');
});

Template.registerHelper('currentUser', () => {
  return Meteor.user();
});

Template.registerHelper('toDate', (date) => {
  var date = new Date(date);
  return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
});
