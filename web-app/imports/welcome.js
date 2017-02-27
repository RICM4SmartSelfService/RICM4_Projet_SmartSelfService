import { Template } from 'meteor/templating';
 
import './welcome.html';
 
Template.welcome.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});
