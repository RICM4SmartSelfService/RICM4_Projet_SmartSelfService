import '/imports/ui/locker/unlock.js';

Router.route('/locker/unlock/:_id', function () {
  this.render('Unlock');
}, { name : 'locker.unlock' });

