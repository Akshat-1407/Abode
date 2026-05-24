## Authentication
It is the process of verifying who someone is.

## Authorization
It is the process of veryfying what specific applications, files and data a user has access to.

## Storing Passwords
We `NEVER` store passwords as it is. We store their `hashed` form

password -> hashing function -> hashed form
hello, world -> hashing function -> af36gv4rd8s5v14g78e8sw25d4gbcx56s1z2d5g4k8g6

## Hashing
* For every input there is a fixed output
* They are one way functions. We can't get input from output.
* For a different input there is a different output but of same length.
* Small changes in input should bring large changes in output.

## Salting
Password salting is a technique to protect password stored in database by adding a string of 32 or more characters and then hashing them.


## connect-flash    
The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.


```javascript
    // app.js
    const express = require("express");
    const app = express();
    const session = require("express-session")
    const flash = require('connect-flash');

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }));

    app.get("/regsiter", (req, res) => {
        let {name} = req.querry;
        req.session.name = name;
        req.flash("success", "user registered sucessfully!")
        res.redirect("/hello");
    });

    app.get("/hello", (req, res) => {
        res.render("page.ejs", {name: req.session.name, msg: req.flash("success")});
    });

    // page.ejs
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page</title>
    </head>
    <body>
        <%= msg %>
        <h2>Hello, <%= name %> </h2>
    </body>
    </html>
```


## Cookies in Express.js
Cookies are small pieces of data stored in the user's browser, often used to maintain sessions or store user preferences. In Express.js, cookies help manage authentication, track users, and store temporary data.

```javascript
    const express = require("express");
    const cookieParser = require("cookie-parser");

    const app = express();
    app.use(cookieParser()); // Middleware to parse cookies

    // Setting a cookie
    app.get("/set-cookie", (req, res) => {
        res.cookie("user", "Akshat");
        res.send("Cookie set!");
    });

    // Reading a cookie
    app.get("/get-cookie", (req, res) => {
        res.send(`User cookie: ${req.cookies.user}`);
    });

    // Deleting a cookie
    app.get("/clear-cookie", (req, res) => {
        res.clearCookie("user");
        res.send("Cookie cleared!");
    });

    app.listen(3000, () => console.log("Server running on port 3000"));
```
___

## Signed Cookies in Express.js
Signed cookies add an extra layer of security by preventing tampering. When a cookie is signed, its value is encrypted using a secret key, ensuring the integrity of the data.

```javascript
    const express = require("express");
    const cookieParser = require("cookie-parser");

    const app = express();
    app.use(cookieParser("your_secret_key")); // Enable signed cookies

    // Setting a signed cookie
    app.get("/set-signed-cookie", (req, res) => {
        res.cookie("user", "Akshat", { signed: true });
        res.send("Signed cookie set!");
    });

    // Reading a signed cookie
    app.get("/get-signed-cookie", (req, res) => {
        res.send(`User: ${req.signedCookies.user}`);
    });

    app.listen(3000, () => console.log("Server running on port 3000"));
```


## res.locals
Use this property to set variables accessible in templates rendered with res.render. The variables set on res.locals are available within a single request-response cycle, and will not be shared between requests.

```javascript
    // app.js
    const express = require("express");
    const app = express();
    const session = require("express-session")
    const flash = require('connect-flash');

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }));

    app.get("/regsiter", (req, res) => {
        let {name = "anonymous"} = req.querry;
        req.session.name = name;

        if (name === "anonymous") {
            req.flash("error", "user not registered")
        }
        else {
            req.flash("success", "user is registered sucessfully");
        }

        res.redirect("/hello");
    });

    app.get("/hello", (req, res) => {
        res.locals.successMsg = req.flash("success");
        res.locals.errorMsg = req.flash("error");
        res.render("page.ejs", {name: req.session.name});
    });

    // page.ejs
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page</title>
    </head>
    <body>
        <%= successMsg %>
        <%= errorMsg %>
        <h2>Hello, <%= name %> </h2>
    </body>
    </html>
```


### Express Sessions -

```javascript
    const express = require("express");
    const app = express();
    const session = require("express-session")

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }));

    app.get("/reqCount", (req, res) => {
        if (req.session.count) {
            req.session.count++;
        }
        else {
            req.session.count = 1;
        };

        req.send(`You sent a request ${req.session.count} times`);
    });
```
___

### Storing and using Session info -

```javascript
    const express = require("express");
    const app = express();
    const session = require("express-session")

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }));

    app.get("/regsiter", (req, res) => {
        let {name} = req.querry;
        req.session.name = name;
        res.redirect("/hello");
    });

    app.get("/hello", (req, res) => {
        console.log(`Hello, ${req.session.name}`);
    });
```
