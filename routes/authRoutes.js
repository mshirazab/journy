const passport = require('passport');
const User = require('../models/user');

module.exports = (app) => {
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send({ success: true, message: 'user has been logged out' });
  });
  app.post('/auth/signup', async (req, res) => {
    const response = await User.create(req.body.userName, req.body.password);
    res.send(response);
  });
  app.get('/auth/user', (req, res) => {
    if (req.user) res.send({ success: true, message: req.user });
    else res.status(401).send({ success: false, message: 'Not logged in' });
  });
  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: 'Username or password is wrong!' });
      }
      return req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'authentication succeeded' });
      });
    })(req, res, next);
  });
};
