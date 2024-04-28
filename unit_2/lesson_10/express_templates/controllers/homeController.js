"use strict";

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName //assign a local variable to a request parameter
  res.render("index", { theName: paramsName }); //respond with a custom EJS view 
  //pass a local variable to a rendered view
};
