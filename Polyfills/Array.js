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
SmartPolyfill.register('Array.prototype.forEach', {
  IE: '1 - 8'
}, function(callback, thisArg){
  if(typeof callback !== 'function') throw new TypeError("Callback is not a function");
  thisArg = typeof thisArg === 'undefined' ? this : thisArg;
  for(var i = 0; i < this.length; ++i){
    callback.call(thisArg, this[i], i, this);
  }
});
SmartPolyfill.register('Array.prototype.map', {
  IE: '1 - 8'
}, function(callback, thisArg){
  if(typeof callback !== 'function') throw new TypeError("Callback is not a function");
  thisArg = typeof thisArg === 'undefined' ? this : thisArg;
  var ToReturn = [];
  for(var i = 0; i < this.length; ++i){
    ToReturn.push(callback.call(thisArg, this[i], i, this));
  }
  return ToReturn;
});
SmartPolyfill.register('Array.prototype.filter', {
  IE: '1 - 8'
}, function(callback, thisArg){
  if(typeof callback !== 'function') throw new TypeError("Callback is not a function");
  thisArg = typeof thisArg === 'undefined' ? this : thisArg;
  var ToReturn = [];
  for(var i = 0; i < this.length; ++i){
    if(callback.call(thisArg, this[i], i, this)) ToReturn.push(this[i]);
  }
  return ToReturn;
});
SmartPolyfill.register('Array.prototype.reduce', {
  IE: '1 - 8',
  Firefox: '1 - 3',
  Safari: '1 - 3',
  Opera: '1 - 10'
}, function(callback, value){
  if(typeof callback !== 'function') throw new TypeError("Callback is not a function");
  var i = 0;
  value = value || this[i++];
  for(; i < this.length; ++i){
    value = callback.call(this, value, this[i], i, this);
  }
  return value;
});
SmartPolyfill.register('Array.from', {
  IE: '*',
  Chrome: '*',
  Firefox: '1 - 31',
  Safari: '*',
  Opera: '*'
}, function(Input, mapFn, thisArg){
  if(typeof mapFn === 'undefined'){
    return Array.prototype.slice.call(Input);
  } else {
    return Array.prototype.map.call(Input, mapFn, thisArg);
  }
});
SmartPolyfill.register('Array.of', {
  IE: '*',
  Chrome: '1 - 38',
  Firefox: '1 - 24',
  Safari: '*',
  Opera: '*'
}, function(){
  return Array.prototype.slice.call(arguments);
});
SmartPolyfill.register('Array.prototype.find', {
  IE: '*',
  Chrome: '*',
  Firefox: '1 - 24',
  Safari: '*',
  Opera: '*'
}, function(Callback, thisArg){
  var Ret;
  for(var i = 0; i <= this.length; ++i){
    Ret = Callback.call(thisArg, this[i], i, this);
    if(Ret !== false) return Ret;
  }
  return Ret;
});