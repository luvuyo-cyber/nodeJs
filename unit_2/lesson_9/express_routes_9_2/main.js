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
  console.log("request query", req.query);
  next();
});

app.post("/", (req, res) => { //create a new post route for the home page
  console.log("request body:", req.body); //log the request's body
  res.send("POST Successful!");
});

app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
