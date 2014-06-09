/* jshint node:true */
"use strict";

var stat = require("node-static"),
    http = require("http");

var file = new stat.Server("./static", {cache: false});

var home = process.env.deployPath || "";

var server = http.createServer(function (request, response) {
    console.log("request!");
    request.url = request.url.substring(home.length);
    
    request.on("end", function () {
        console.log("Serving file " + request.url);
        file.serve(request, response);
    }).resume();
}).listen(process.env.port || 8080);

