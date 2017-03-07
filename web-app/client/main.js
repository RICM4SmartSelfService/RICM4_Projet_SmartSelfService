import '../imports/ui/home.js';
import '../imports/ui/search.js';
import '../imports/startup/accounts-config.js';

Router.route('/', function () {
  this.render('Home');
});

Router.route('/search', function () {
  this.render('Search');
});


