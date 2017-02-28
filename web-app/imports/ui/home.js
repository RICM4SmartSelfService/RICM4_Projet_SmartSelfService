import { Template } from 'meteor/templating';
import './home.html';

Template.body.helpers({
  hello: [
    { text: 'Bonjour' },
    { text: 'Madame' },
    { text: 'Gilles' },
  ],
});
