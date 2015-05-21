"use strict";
// Polyfills for commonly used Function functions
SmartPolyfill.register('Function.prototype.bind', {
  Chrome: '1 - 6',
  Firefox: '1 - 3',
  IE: '1 - 8',
  Safari: '1 - 4',
  Opera: '1 - 10'
}, function(thisArg) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var Callback = this;
  var Rest = Array.prototype.slice.call(arguments, 1);
  return function(){
    return Callback.apply(thisArg, Rest.concat(Array.prototype.slice.call(arguments)));
  };
});