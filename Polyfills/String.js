"use strict";
// Polyfills for ES6 String functions
SmartPolyfill.register('String.prototype.includes', {
  Chrome: '1 - 40',
  Firefox: '1 - 39',
  IE: '*',
  Safari: '*',
  Opera: '*'
}, function(text, startIndex){
  return this.indexOf(text, startIndex) !== -1;
});

SmartPolyfill.register('String.prototype.startsWith', {
  Chrome: '1 - 40',
  Firefox: '1 - 16',
  IE: '*',
  Safari: '*',
  Opera: '*'
}, function(searchString, position){
  position = position || 0;
  return this.lastIndexOf(searchString, position) === position;
});
SmartPolyfill.register('String.prototype.endsWith', {
  Chrome: '1 - 40',
  Firefox: '1 - 16',
  IE: '*',
  Safari: '*',
  Opera: '*'
}, function(searchString, position){
  var subjectString = this.toString();
  if (position === undefined || position > subjectString.length) {
    position = subjectString.length;
  }
  position -= searchString.length;
  var lastIndex = subjectString.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
});
SmartPolyfill.register('String.prototype.trim', {
  Firefox: '1 - 2',
  IE: '1 - 8',
  Safari: '1 - 4',
  Opera: '1 - 10'
}, function(){return this.replace(/^\s+|\s+$/g, '')});