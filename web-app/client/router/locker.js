import '/imports/ui/locker/unlock.js';

Router.route('/locker/unlock/:id', function () {
  this.render('Unlock');
}, { name : 'locker.unlock' });

