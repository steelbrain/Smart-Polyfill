Smart-Polyfill
===========
Smart-Polyfill is a smart modular Polyfill server written in NodeJS. It's extremely easy to extend. It allows you to send the client exactly what it needs, for example If the browser is only lacking support for `String.prototype.{starts,ends}With` it will send it only that and nothing more. It contains an HTTP server too, which is great in collaboration with nginx.

### Set up
```bash
sudo npm install -g smart-polyfill
smart-polyfill 8080 # Replace 8080 with a port of your choice
```
Now navigate to `http://localhost:8080/polyfill.js` in a browser of your choice to see it's specific polyfills.

### Adding more Shims
Adding more shims to Smart-Polyfill is as simple as writing a function, choose a file in Polyfills directory, create a new one if you want (and require it in Bin/Server.js).
An example of `String.prototype.startsWith` shim
```js
SmartPolyfill.register('String.prototype.startsWith', {
  Chrome: '1 - 40',
  Firefox: '1 - 16',
  IE: '*',
  Netscape: '*',
  Safari: '*'
}, function(searchString, position){
  position = position || 0;
  return this.lastIndexOf(searchString, position) === position;
});
```

### Nginx Configuration
Just drop this line in your nginx configuration's server block to proxy the `polyfill.js ` requests through Smart-Polyfill.
```
  location =/polyfill.js {
    proxy_pass http://localhost:8080/polyfill.js;
  }
```

#### License
This project is licensed under the terms of MIT license. See the License file for more info.
