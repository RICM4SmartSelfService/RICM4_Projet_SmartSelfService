import '/imports/ui/locker/admin/dispLockers.js';

Router.route('/admin/lockers', function() {
  if(!Meteor.user() && !Meteor.user.roles.indexOf("admin") < 0) {
    Session.set("err", "Vous devez être admin pour accéder à cette page.");
    Router.go('user.login');
  }
  this.render('dispLockers');
}, { name : 'admin.lockers.display' });
