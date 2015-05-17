"use strict";

let HTTP = require('http');
let LRU = require('lru-cache');

let BrowserCache = new LRU(50);

class Polyfill{
  static Listen(Port){
    return HTTP.createServer(function(Request, Response){
      try {
        Polyfill.serverRequest(Request, Response);
        Response.end("")
      } catch(e){
        Response.status(404)        // HTTP status 404: NotFound
          .end('Not found');
      }
    }).listen(Port);
  }
  static serverRequest(Request, Response){
    var Browser;
    if(Request.url !== '/polyfill.js'){
      throw null
    }
    Response.writeHeader("Content-Type", "application/javascript");

    Browser = Polyfill.recognizeBrowser(Request.headers['user-agent'] || '');

    if(Browser.Version === 0) return ;
    console.log(Browser);
  }
  static recognizeBrowser(UserAgent){

    if(BrowserCache.has(UserAgent)) return BrowserCache.get(UserAgent);

    // Taken from http://stackoverflow.com/a/8754134/2652018
    var Browser = {Name: '', Version: 0};
    try {
      if (/Opera[\/\s](\d+\.\d+)/.test(UserAgent)) {
        Browser.Name = Polyfill.Opera;
      } else if (/MSIE (\d+\.\d+);/.test(UserAgent)) {
        Browser.Name = Polyfill.IE;
      } else if (/Navigator[\/\s](\d+\.\d+)/.test(UserAgent)) {
        Browser.Name = Polyfill.Netscape;
      } else if (/Chrome[\/\s](\d+\.\d+)/.test(UserAgent)) {
        Browser.Name = Polyfill.Chrome;
      } else if (/Safari[\/\s](\d+\.\d+)/.test(UserAgent)) {
        Browser.Name = Polyfill.Safari;
        /Version[\/\s](\d+\.\d+)/.test(UserAgent);
        Browser.Version = Number(RegExp.$1);
      } else if (/Firefox[\/\s](\d+\.\d+)/.test(UserAgent)) {
        Browser.Name = Polyfill.Firefox;
      }
      if(Browser.Version === 0){
        Browser.Version = parseFloat(Number(RegExp.$1));
      }
    } catch(e) {}

    BrowserCache.set(UserAgent, Browser);
    return Browser;
  }
}

Polyfill.Opera = 'Opera';
Polyfill.IE = 'IE';
Polyfill.Netscape = 'Netscape';
Polyfill.Chrome = 'Chrome';
Polyfill.Safari = 'Safari';
Polyfill.Firefox = 'Firefox';

module.exports = Polyfill;