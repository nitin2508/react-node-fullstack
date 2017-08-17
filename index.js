const express = require('express');
const passport = require('passport');
const GoogleStrategy =  require('passport-google-oauth20').Strategy;
const app = express();
const keys = require('./config/keys');
console.log(keys)
passport.use(new GoogleStrategy({
  clientID:keys.googleClientId,
  clientSecret:keys.googleClientSecret,
  callbackURL:'/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    console.log('accessToken',accessToken);
    console.log('refreshToken',refreshToken);
    console.log('profile',profile);
})
);

app.get('/auth/google/callback',passport.authenticate('google'))
app.get('/auth/google',passport.authenticate('google',{
  scope:['profile','email']
}))



app.get('/',(req,res)=>{
  res.send({hi:'Buddy'})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log('Magic happen on 3000');
})
