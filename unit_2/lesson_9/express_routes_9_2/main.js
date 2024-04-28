"use strict";

const port = 3000,
  express = require("express"),
  app = express();

app.use(
  express.urlencoded({
    extended: false
  })
); //tell your Express.js application to parse URL-encoded data
app.use(express.json());

app.use((req, res, next) => { 
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => { //create a new post route for the home page
  console.log("request body:", req.body); //log the request's body
  console.log("request query", req.query); //for query strings. stored in object
  res.send("POST Successful!");
});

app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
