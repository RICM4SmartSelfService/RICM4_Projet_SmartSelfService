import '../imports/ui/home.js';
import '../imports/ui/search.js';
import '../imports/ui/unlock.js';
import '../imports/ui/user/register.js';
import '../imports/ui/user/login.js';
import '../imports/ui/user/actions.js';
import '../imports/ui/addLocker.js';
import '../imports/ui/menu.js';
import '../imports/ui/deposit.js';
import '../imports/ui/object/dropoff.js';
import '../imports/ui/object/takeoff.js';
import '../imports/startup/accounts-config.js';

Router.route('/', function () {
  this.render('Home');
});

Router.route('/register', function () {
  this.render('Register');
});

Router.route('/login', function () {
  this.render('Login');
});

Router.route('/search', function () {
  if(!Meteor.user()) {
    Router.go('/login');
  }
  this.render('Search');
});

Router.route('/unlock/:id', function () {
  this.render('Unlock');
});

Router.route('/addLocker', function() {
	this.render('AddLocker');
});

Router.route('/added', function() {
	this.render('added');
});

Router.route('/object/dropoff/:_id',function() {
  this.render('DropOffObject');
});
Router.route('/object/dropoff/:_id/reserved', function() {
	this.render('Dropreserved');
});

Router.route('/deposit', function() {
	this.render('deposit');
});

Router.route('/takeoff/:id', function() {
	this.render('takeoff');
});
Router.route('/takeoff/:id/reserved', function() {
	this.render('reserved');
});

Router.route('/actions', function(){
	this.render('Actions');
});


Template.registerHelper( 'currentUser', () => {
  return Meteor.user();
});
