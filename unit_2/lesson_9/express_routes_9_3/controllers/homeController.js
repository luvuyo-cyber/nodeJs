"use strict";
//moving a callback to homeController.js
exports.sendReqParam = (req, res) => { //create a function to handle route-specific requests
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};
