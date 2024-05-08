"use strict";

const express = require("express"), //require express
  app = express(), //instantiate the express application
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({ //tell the express.js app to use body-parser for processing url-encoded and json parameters
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public")); //to enable static assets to be served directly

app.get("/", (req, res) => { //create route for the homepage
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => { //set application to listen on port 3000
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
