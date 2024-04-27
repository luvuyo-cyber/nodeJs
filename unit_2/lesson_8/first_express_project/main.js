const port = 3000,
    express = require("express"), //add the express module to your application
    app = express(); //assign the express application to the app constant

app.get("/", (req, res) => { //set up a GET route for the homepage
    console.log(req.params); //access request parameters
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.send("Hello, Universe!"); //issue a response from the server to the client with res.end
})

    .listen(port, () => { //set up the application to listen at port 3000
        console.log(`The Express.js server has started and is listening on port number: ${port}`);
    });