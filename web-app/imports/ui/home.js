import { Template } from 'meteor/templating';
import './home.html';

Template.home.helpers({
  table: [
    { text: 'Bonjour' },
    { text: 'Madame' },
    { text: 'Gilles' },
  ],
});
