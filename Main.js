
var IsIoJS = parseInt(process.version.substr(1)) > 0;
if(IsIoJS){
  module.exports = require('./Source/Main');
} else {
  module.exports = require('./Dist/Main');
}
