"use strict";
// Polyfills for commonly used functions for IE8-
SmartPolyfill.register('Object.create', {
  Chrome: '1 - 4',
  Firefox: '1 - 3',
  IE: '1 - 8',
  Netscape: '*',
  Safari: '1 - 4'
}, function(o, props){
  function F() {}
  F.prototype = o;

  if (typeof(props) === "object") {
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        F[prop] = props[prop];
      }
    }
  }
  return new F();
});