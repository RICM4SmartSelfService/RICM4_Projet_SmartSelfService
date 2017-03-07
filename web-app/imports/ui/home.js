import { Template } from 'meteor/templating';
import './home.html';
import { Lockers } from '../api/lockers.js';

Template.home.helpers({
  lockers() {
    return Lockers.find({});
  },
});
