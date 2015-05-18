"use strict";
// Polyfills for commonly used functions for IE8-
SmartPolyfill.register('Object.create', {
  Chrome: '1 - 4',
  Firefox: '1 - 3',
  IE: '1 - 8',
  Safari: '1 - 4'
}, function(o, props){
  function F() {}
  F.prototype = o;
  if (typeof(props) === "object")
    for (var prop in props)
      if (props.hasOwnProperty(prop))
        F[prop] = props[prop];
  return new F();
});
SmartPolyfill.register('Object.keys', {
  Chrome: '1 - 4',
  Firefox: '1 - 3',
  IE: '1 - 8',
  Opera: '1 - 11',
  Safari: '1 - 4'
}, function(o) {
  if (o !== Object(o))
    throw new TypeError('Object.keys called on a non-object');
  var r = [];
  for (r[r.length] in o);
  return r
});