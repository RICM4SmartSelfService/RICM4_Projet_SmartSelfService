import { Accounts } from 'meteor/accounts-base';

Tracker.autorun(function () {
    Meteor.subscribe("userData");
});
