import { Template } from 'meteor/templating';
import './search.html';
import { Lockers } from '../api/lockers.js';

Template.search.helpers({
  lockers() {
    return Lockers.find({});
  },
});
