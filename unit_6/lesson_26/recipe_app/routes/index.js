"use strict";

const router = require("express").Router(), //require Express.js Router
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"), // require all the route modules within the same directory
  courseRoutes = require("./courseRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");

router.use("/users", userRoutes); //use the routes from the relative route modules with namespaces
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router; //export the router from index.js
