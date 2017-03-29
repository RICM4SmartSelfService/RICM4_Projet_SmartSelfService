import '/imports/ui/home.js';
import '/imports/ui/user/register.js';
import '/imports/ui/user/login.js';
import '/imports/ui/search.js';

Router.route('/', function () {
  this.render('Home');
}, { name : 'home' });

Router.route('/register', function () {
  if(Meteor.user() != null) {
    Router.go("home");
  }
  this.render('Register');
}, { name : 'user.register' });

Router.route('/login', function () {
  if(Meteor.user() != null) {
    Router.go("home");
  }
  this.render('Login');
}, { name : 'user.login' });

Router.route('/search', function () {
  if(!Meteor.user()) {
    Session.set("err", "Vous devez vous connecter avant d'effectuer cette action");
    Router.go('user.login');
  }
  this.render('Search');
}, {name : 'search'});
