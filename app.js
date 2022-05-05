// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const User = require('./models/User.model')

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "Project2";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
const { geoSearch } = require("./models/User.model");
app.use("/auth", authRoutes);

const profile = require('./routes/profile.routes');
app.use('/profile', profile);

const events = require("./routes/event.routes")
app.use("/profile", events)

const changeProfilePic = require('./routes/changeProfilePic.routes');
app.use('/', changeProfilePic)

const gastosNuevos = require('./routes/gastos.routes');
app.use('/profile', gastosNuevos)

const sendEmail = require('./routes/email.routes');
app.use('/', sendEmail)


// i also need a route to change profile info 
// app.js
 

 
passport.use(
  new GoogleStrategy(
    {
      clientID: "908695264690-d273qlpuaumugnuj5rahcm6vreuljng1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
        console.log("Google account details:", profile);
        
        User.findOne({ googleID: profile.id })
        .then(user => {
        if (user) {
            done(null, user);
            return;
        }
        done(null, profile)
        passport.serializeUser(function(user, done) {
            console.log(user)
            done(null, user.id);
        });
        //   User.create(
        //       { googleID: profile.id,
        //         username: profile.displayName,
        //         password: "",
        //         name: profile.name.familyName,
        //         Avatar: profile.photos[0].value

        //         }
        //  )
        //     .then(newUser => {
        //         done(null, newUser);
        //     })
        //     .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
