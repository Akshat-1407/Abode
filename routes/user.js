const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require("../controllers/userController.js");

// Signup
router.get("/signup", userController.signupForm);

router.post("/signup", wrapAsync(userController.register));

// Login
router.get("/login", userController.loginForm);

router.post("/login",
   saveRedirectUrl,
   passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
   wrapAsync(userController.login)
);

// Logout
router.get("/logout", userController.logout);


module.exports = router;