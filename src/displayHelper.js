'use strict';

const icon = require('../assets/icon.png');

/**
 * Function that shows the message to enter a valid url.
 * @param {object} scope
 * @param  {string} The message to display.
 */
const showMessage = (scope, message) => {
  scope.display({
      title: message,
      icon,
  });
}

/**
 * Displays the message to set bit.ly access token.
 * @param {object} scope
 */
const showMissingConfigMessage = (scope) => {
  scope.display({
    title: 'Missing configuration: Click to set your bit.ly access token.',
    onSelect: (event) => {
      scope.actions.replaceTerm('plugin bitly');
      event.preventDefault();
    }
  });
}

/**
 * Shows the final shortened url
 * @param {object} scope 
 * @param {string} shortUrl 
 */
const showShortenURLResult = (scope, shortUrl) => {
  scope.display([
    {
      title: 'Shortened URL',
      subtitle: shortUrl,
      icon,
      clipboard: shortUrl,
      onSelect: () => {
        scope.actions.copyToClipboard(shortUrl);
      },
      getPreview: () => {
        return `<div> ${shortUrl}</div>`
      }
    }]);
}

module.exports = {
  showMessage,
  showMissingConfigMessage,
  showShortenURLResult
}
