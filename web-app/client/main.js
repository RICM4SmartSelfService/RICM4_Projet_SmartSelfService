import '../imports/ui/*.js';
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

Router.route('/object/drop-off/:_id',function() {
  this.render('DropOffObject');
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


Template.registerHelper( 'currentUser', () => {
  return Meteor.user();
});
