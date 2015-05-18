#!/usr/bin/env nodejs
var Cluster = require('cluster');
var Port = Number(process.argv[2]);
if(Cluster.isMaster){
  if(Port !== Port){
    console.error("Please specify a port to listen on!");
    process.exit(1);
  }
  var NumCores = require('os').cpus().length;
  for(var I = 0; I < NumCores; ++ I){
    Cluster.fork();
  }
} else {
  var Polyfill = require('../Main');
  require('../Polyfills/Array');
  require('../Polyfills/Date');
  require('../Polyfills/Function');
  require('../Polyfills/Object');
  require('../Polyfills/String');
  Polyfill.listen(Port);
}