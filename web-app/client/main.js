import '../imports/ui/home.js';
import '../imports/ui/search.js';
import '../imports/ui/unlock.js';
import '../imports/ui/register.js';
import '../imports/ui/login.js';
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

Router.route('/unlock', function () {
  this.render('Unlock');
});
