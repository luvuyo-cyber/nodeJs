"use strict";
const port = 3000,
    http = require("http"), //require the http and http-status-codes modules
    httpStatus = require("http-status-codes"),
    app = http.createServer((request, response) => { //create server with request and response parameters
        console.log("Received an incoming request!");
        response.writeHead(httpStatus.OK, { //write response to the client
            "Content-Type": "text/html"
        });
        let responseMessage = "<h1>Hello, Universe!</h1>"; //the response
        response.write(responseMessage);
        response.end();
        console.log(`Sent a response : ${responseMessage}`);
    });
app.listen(port); //tell the application server to listen on port 3000
console.log(`The server has started and is listening on port number: ${port}`);
