"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"), //require Mongoose
  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db", //set up the connection to your database
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection; //assign the database to the db variable

db.once("open", () => { //log a message as soon as the database is connected
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//To create and save models in main.js
// var subscriber1 = new Subscriber({ //method 1
//   name: "Jon1 Wexler",
//   email: "jon1@jon1wexler.com"
// }); //Instantiate a new subscriber

// subscriber1.save((error, savedDocument) => { //save a subscriber to the database
//   if (error) console.log(error); //pass potential errors to the next middleware function.
//   console.log(savedDocument); //log saved data document
// });

// Subscriber.create( //method 2
//   {
//     name: "Jon2 Wexler",
//     email: "jon2@jon2wexler.com"
//   },
//   function (error, savedDocument) { //create and save a subscriber in a single step
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

var myQuery = Subscriber.findOne({
  name: "Jon1 Wexler"
}).where("email", /wexler/);

myQuery.exec((error, data) => { //runs a query with a callback function to handle errors and data
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
