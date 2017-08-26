var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
})

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async(accessToken, refreshToken, profile, done) => {

      const existingUser = await User.findOne({
        googleId: profile.id
      });
      console.log(existingUser)
        return done(null, existingUser);

        const user = await new User({
          googleId: profile.id,
          emailId: profile.emails[0].value,
          image: profile.photos[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }).save();
        consol.log(user);
        done(null, user);

      // User.findOne({
      //   googleId: profile.id
      // }).then(existingUser => {
      //   console.log(existingUser);
      //   if (existingUser) {
      //     done(null, existingUser);
      //   } else {
      //     new User({
      //       googleId: profile.id,
      //       emailId: profile.emails[0].value,
      //       image: profile.photos[0].value,
      //       firstName: profile.name.givenName,
      //       lastName: profile.name.familyName
      //     })
      //       .save()
      //       .then(user => {
      //         done(null, user);
      //       });
      //   }
      // });
      // console.log("profile", profile);
    }
  )
);