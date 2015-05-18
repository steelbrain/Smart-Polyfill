"use strict";
// Polyfills for Date Functions
SmartPolyfill.register('Date.now', {
  Chrome: '1 - 4',
  Firefox: '1 - 2',
  IE: '1 - 8',
  Safari: '1 - 3'
}, function(){
  return new Date().getTime();
});