const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require("./models/user");
require("./services/passport.js");

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(cookieSession({
  maxAge:30*24*60*60*1000,
  keys:[keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app);

app.get("/", (req, res) => {
  res.send({ hi: "Buddy" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Magic happen on 5000");
});
