"use strict";
// Polyfills for commonly used Function functions
SmartPolyfill.register('Function.prototype.bind', {
  Chrome: '1 - 6',
  Firefox: '1 - 3',
  IE: '1 - 8',
  Safari: '1 - 4',
  Opera: '1 - 10'
}, function(b) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  function c() {}
  var a = [].slice,
    f = a.call(arguments, 1),
    e = this,
    d = function() {
      return e.apply(this instanceof c ? this : b || window, f.concat(a.call(arguments)));
    };
  c.prototype = this.prototype;
  d.prototype = new c();
  return d;
});