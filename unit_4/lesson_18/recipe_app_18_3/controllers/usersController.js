"use strict";

const User = require("../models/user"); //require the model

module.exports = {
  index: (req, res, next) => {
    User.find() //run the query
      .then(users => { //store user data on the response  and call the next middleware
        res.locals.users = users;
        next();
      })
      .catch(error => { //log errors
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => { //render view
    res.render("users/index");
  }
};
