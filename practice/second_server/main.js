const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();
app.on("request", (req, res) => { //listen for requests

    const getJSONString = obj => {
        return JSON.stringify(obj, null, 2); //convert javascript object to string
    };

    var body = []; //create an array to hold chunk contents
    req.on("data", (bodyData) => { //process it in another callback function
        body.push(bodyData); //add received data to the array
    });
    req.on("end", () => { //run code when data transmission ends.
        body = Buffer.concat(body).toString(); //convert the body array to String of text
        console.log(`Request Body Contents: ${body}`); //log request's contents to your console
    });

    console.log(`request method: ${getJSONString(req.method)}`);
    console.log(`request url: ${getJSONString(req.url)}`);
    console.log(`request headers: ${getJSONString(req.headers)}`);

    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    }); //prepare a response

    let responseMessage = "<h1>This will show on the screen.</h1>";
    res.end(responseMessage); //respond with html to every request
});
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);