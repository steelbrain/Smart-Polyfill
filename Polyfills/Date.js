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
SmartPolyfill.register('Date.prototype.toISOString', {
  IE: '1 - 8'
}, function(){
  var a = this;
  return (
    1e3
    -~a.getUTCMonth()
    *10
    +a.toUTCString()
    +1e3+a/1
  ).replace(
    /1(..).*?(\d\d)\D+(\d+).(\S+).*(...)/,
    '$3-$1-$2T$4.$5Z')
});