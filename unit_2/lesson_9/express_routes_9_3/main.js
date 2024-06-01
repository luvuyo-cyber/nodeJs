"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  console.log("query string:", req.query)
  next();
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST Successful!");
});
//replacing a callback with a controller function in main.js
app.get("/items/:vegetable", homeController.sendReqParam); //handle GET requests to "/items/:vegetable"

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
