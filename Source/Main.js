"use strict";

// @Compiler-Transpile "true"
// @Compiler-Output "../Dist/Main.js"

let HTTP = require('http');
let LRU = require('lru-cache');

let BrowserCache = new LRU(50);
let PolyfillCache = new LRU(500);
let Polyfills = [];

class Polyfill{
  static listen(Port){
    return HTTP.createServer(function(Request, Response){
      try {
        Polyfill.serverRequest(Request, Response);
        Response.end("");
      } catch(e){
        Response.statusCode = 404;
        Response.end("Not Found");
      }
    }).listen(Port, "0.0.0.0");
  }
  static register(Name, Browsers, Function){
    Polyfills.push({Name: Name, Browsers: Browsers, Function: Function.toString()});
  }
  static serverRequest(Request, Response){
    if(Request.url !== '/polyfill.js' && Request.url !== '/polyfill.min.js'){
      throw null
    }
    Response.writeHeader("Content-Type", "application/javascript");

    var Browser = Polyfill.recognizeBrowser(Request.headers['user-agent'] || '');
    let IsMinified = Request.url === '/polyfill.min.js';
    let CacheKey = Browser.Name + ':' + Browser.Version + ':' + IsMinified;

    if(Browser.Version === 0) return ;
    if(PolyfillCache.has(CacheKey)) return Response.write(PolyfillCache.get(CacheKey));

    let Content = [];
    let PolyFillsAdded = [];
    Polyfills.forEach(function(Info){ // O YEE DUSTRUCTURING WHY U NO SUPPORT?!
      let Name = Info.Name;
      let Browsers = Info.Browsers;
      let Function = Info.Function;
      if(!(Browser.Name in Browsers)) return ;
      if(Browsers[Browser.Name] !== '*' && !Polyfill.matches(Browser, Browsers[Browser.Name])) return ;
      PolyFillsAdded.push(Name);
      Content.push(Name + ' = ' + Function);
    });
    Content = "(function(){\n\n// Polyfills Added:  " + PolyFillsAdded.join(', ') + "\n\n" + Content.join(";\n") + ";\n})()";
    PolyfillCache.set(CacheKey, Content);
    Response.write(Content);
  }
  static matches(Browser, Condition){
    if(Condition.indexOf('-') !== -1){
      let Chunks = Condition.split('-');
      return Browser.Version >= Number(Chunks[0].trim()) && Browser.Version <= Number(Chunks[1].trim());
    } else {
      return Browser.Version === Number(Condition);
    }
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

global.SmartPolyfill = Polyfill;

module.exports = Polyfill;