"use strict";

const mongoose = require("mongoose"), //MongoDB isn't enforcing your schema, but Mongoose is.
  subscriberSchema = mongoose.Schema({ //create a new schema with mongoose.Schema
    name: String, //add schema properties
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema); //Exports the Subscriber model as the only module export
/*The model method takes a model name of your choosing and a previously
defined schema.*/
