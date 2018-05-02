const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.username);
});
passport.deserializeUser((username, done) => {
  const user = { username: 'shiraz' };
  done(null, user);
});
passport.use(new LocalStrategy(
  {
    usernameField: 'userName',
    passwordField: 'password',
  },
  async (username, password, done) => {
    const user = await User.find(username);
    if (!user) return done(null, false);
    else if (!bcrypt.compareSync(password, user.password)) return done(null, false);
    return done(null, user);
  },
));
