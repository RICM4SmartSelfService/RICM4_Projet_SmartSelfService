Template.registerHelper('currentUser', () => {
  return Meteor.user();
});

Template.registerHelper('toDate', (date) => {
  var date = new Date(date);
  return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
});

Template.registerHelper('isAdmin', () => {
  if(Meteor.user()) {
    return Meteor.user().roles.indexOf("admin") > -1;
  }
});
