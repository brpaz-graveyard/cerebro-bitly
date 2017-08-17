'use strict';

const icon = require('../assets/icon.png');
const displayHelper = require('./displayHelper');
const Bitly = require('bitlyapi');
const isUrl = require('is-url');

const plugin = (scope) => {

  const match = scope.term.match(/bitly\s(.*)/);

  if (match) {

    // display info message if the bit.ly access token is not set.
    if (!scope.settings || !scope.settings.accessToken) {
      displayHelper.showMissingConfigMessage(scope);
      return;
    }

    const input = match[1];

    if (input) {

      // no need to do requests if the user is still typing the url
      if (!isUrl(input)) {
        displayHelper.showMessage(scope, 'Please insert a valid URL');
        return;
      }

      let bitly = new Bitly(scope.settings.accessToken);

      // call bitly service
      bitly.shorten(input)
        .then((response) => {
          displayHelper.showShortenURLResult(scope, response.data.url);
        }, (error) => {
          displayHelper.showMessage(scope, 'An error ocorred when generating short URL.');
          throw error;
        });  
    }
  }
};

module.exports = {
  fn: plugin,
  name: 'bit.ly URL shortener',
  keyword: 'bitly',
  icon,
  settings: {
    accessToken: {
      type: 'string',
      description: 'bit.ly access token',
      defaultValue: ''
    },
  }
};
