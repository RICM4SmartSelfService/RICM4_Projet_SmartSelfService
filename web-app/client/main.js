import '../imports/ui/home.js';
import '../imports/ui/search.js';
import '../imports/ui/connect.js';
import '../imports/ui/unlock.js';
import '../imports/startup/accounts-config.js';

Router.route('/', function () {
  this.render('Home');
});

Router.route('/register', function () {
  this.render('Register');
});

Router.route('/search', function () {
  this.render('Search');
});

Router.route('/unlock', function () {
  this.render('Unlock');
});
