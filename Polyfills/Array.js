"use strict";
// Polyfills for Array Functions
SmartPolyfill.register('Array.isArray', {
  Chrome: '1 - 4',
  Firefox: '1 - 3',
  IE: '1 - 8',
  Safari: '1 - 4',
  Opera: '1 - 10'
}, function(o){
  return Object.prototype.toString.call(o) === '[object Array]';
});
SmartPolyfill.register('Array.prototype.indexOf', {
  IE: '1 - 8'
}, function(searchElement, fromIndex) {
  fromIndex = fromIndex || 0;
  if(fromIndex < this.length){
    for(var i = fromIndex; i < this.length; ++i){
      if(this[i] === searchElement) return i;
    }
  }
  return -1;
});
SmartPolyfill.register('Array.prototype.lastIndexOf', {
  IE: '1 - 8'
}, function(searchElement, fromIndex){
  fromIndex = fromIndex || this.length - 1;
  if(fromIndex < this.length){
    for(var i = fromIndex; i < this.length && i > -1; --i){
      if(this[i] === searchElement) return i;
    }
  }
  return -1;
});