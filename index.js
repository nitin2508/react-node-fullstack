const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require("./models/user");
require("./services/passport.js");

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());



app.use(cookieSession({
  maxAge:30*24*60*60*1000,
  keys:[keys.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app);
require('./routes/billingRoutes')(app);

app.get("/", (req, res) => {
  res.send({ hi: "Buddy" });
});

if(process.env.NODE_ENV ==='production'){

  //express will serve production assets
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*',(req,res)=>{
    res.sendfile(path.resolve(__dirname,'client','build','index.html'))
  })

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Magic happen on 5000");
});
