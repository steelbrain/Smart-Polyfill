"use strict";
// Polyfills for ES6 String functions
SmartPolyfill.register('String.prototype.includes', {
  Chrome: '1 - 40',
  Firefox: '1 - 39',
  IE: '*',
  Safari: '*'
}, function(text, startIndex){
  return this.indexOf(text, startIndex) !== -1;
});

SmartPolyfill.register('String.prototype.startsWith', {
  Chrome: '1 - 40',
  Firefox: '1 - 16',
  IE: '*',
  Safari: '*'
}, function(searchString, position){
  position = position || 0;
  return this.lastIndexOf(searchString, position) === position;
});
SmartPolyfill.register('String.prototype.endsWith', {
  Chrome: '1 - 40',
  Firefox: '1 - 16',
  IE: '*',
  Safari: '*'
}, function(searchString, position){
  var subjectString = this.toString();
  if (position === undefined || position > subjectString.length) {
    position = subjectString.length;
  }
  position -= searchString.length;
  var lastIndex = subjectString.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
});