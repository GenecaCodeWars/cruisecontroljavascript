// reference the http module so we can create a webserver
var http = require("http");
var url = require("url");
require("coffee-script");
var engine = require("./engine");
// Uncomment this next line to use plain old javascript instead
//var engine = require("./enginejs");

// Port and IP
if (!process.env.PORT) {
  process.env.IP = '127.0.0.1';
  process.env.PORT = '3000';
}

// Create a basic server
http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log(pathname);

  if (pathname.toLowerCase() == "/command" && req.method == 'POST') {
    handlePost(req, res);
  } else {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Please post to /command to run the engine");
    res.end();
  }
}).listen(process.env.PORT, process.env.IP);

console.log("Server listening at http://" + process.env.IP + ":" + process.env.PORT);



function handlePost(req, res) {
    var fullBody = '';

    req.on('data', function(chunk) {
      // Append the current chunk of data to the fullBody variable
      fullBody += chunk.toString();
    });

    req.on('end', function() {
      // Parse the received body data
      console.log(fullBody);
      var cmds = engine.processGameStatus(fullBody);

      // Send a response back
      res.writeHead(200, "OK", {"Content-Type": "application/json"});
      res.write(cmds);
      res.end();
    });
};
