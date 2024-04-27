"use strict";

//listing 6.2
// const port = 3000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     fs = require("fs"); //require the fs module

// const routeMap = { //set up route mapping for html files
//     "/": "views/index.html"
// };

// http
//     .createServer((req, res) => {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/html"
//         });
//         if (routeMap[req.url]) {
//             fs.readFile(routeMap[req.url], (error, data) => { //read the contents of the mapped file
//                 res.write(data); //respond with file contents
//                 res.end();
//             });
//         } else {
//             res.end("<h1>Sorry, not found.</h1>");
//         }
//     })

//     .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

//listing 6.3
// const port = 3000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     fs = require("fs"); //require the fs module

// const getViewUrl = (url) => { //create a function to interpolate the URL into the file path
//     return `views${url}.html`;
// };

// http.createServer((req, res) => {
//     let viewUrl = getViewUrl(req.url); //get the file-path string
//     fs.readFile(viewUrl, (error, data) => { //interpolate the request URL into your fs file search
//         if (error) { //handle errors witha 404 response code
//             res.writeHead(httpStatus.NOT_FOUND);
//             res.write("<h1>FILE NOT FOUND</h1>");
//         } else { //respond with file contents
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "text/html"
//             });
//             res.write(data);
//         }
//         res.end();
//     });
// })

//     .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

//listing 6.4
const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs"); //require the fs module

const sendErrorResponse = res => { //create an error-handling function
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

http
    .createServer((req, res) => {
        let url = req.url; //store the request's URL in a variable url
        if (url.indexOf(".html") !== -1) { //check the URL to see whether it contains a file extension
            console.log("in html logic", url);
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            }); //customize the response's content type
            customReadFile(`./views${url}`, res); //call readFile to read file contents
        } else if (url.indexOf(".js") !== -1) {
            console.log("in js logic", url);
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/javascript"
            });
            customReadFile(`./public/js${url}`, res);
        } else if (url.indexOf(".css") !== -1) {
            console.log("in css logic", url);
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/css"
            });
            customReadFile(`./public/css${url}`, res);
        } else if (url.indexOf(".png") !== -1) {
            console.log("in png logic", url);
            res.writeHead(httpStatus.OK, {
                "Content-Type": "image/png"
            });
            customReadFile(`./public/images${url}`, res);
        } else {
            sendErrorResponse(res);
        }
    })

    .listen(3000);
console.log(`The server is listening on port number: ${port}`);

const customReadFile = (file_path, res) => { //look for a file by the name requested
    if (fs.existsSync(file_path)) { //check whether the file exists
        fs.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res); //for any errors associated with running the file
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res); //error for file that doesn't exist 
    }
};


