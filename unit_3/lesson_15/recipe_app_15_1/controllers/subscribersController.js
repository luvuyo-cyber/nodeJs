"use strict";

const Subscriber = require("../models/subscriber"); //require the subscriber module

exports.getAllSubscribers = (req, res, next) => { //export getAllSubscribers to pass data from the database to the next middleware function
  Subscriber.find({}, (error, subscribers) => { //query will find on the Subscriber model
    if (error) next(error); //pass an error to the next middleware function
    req.data = subscribers; //set data that comes back from mongoDB on request object
    next(); //continue to the next middleware function
  });
};
