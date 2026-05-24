const User = require("../models/user.js");

// Signup - Show signup form
module.exports.signupForm = (req, res) => {
  res.render("./users/signup.ejs");
};



// Register - Create new user account
module.exports.register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });

    let registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    // Login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Abode");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};



// Login - Show login form
module.exports.loginForm = (req, res) => {
  res.render("./users/login.ejs");
};



// Login - Authenticate user and create session
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Abode!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};



// Logout - Destroy user session
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
