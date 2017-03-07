import '../imports/ui/home.js';
import '../imports/ui/search.js';
import '../imports/ui/connect.js';
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
