const Journal = require('../models/journal');

module.exports = (app) => {
  app.post('/api/journal/add', async (req, res) => {
    const response = await Journal.add({
      username: req.user.username,
      entry: req.body.entry,
      heading: req.body.heading,
    });
    res.send(response);
  });
  app.post('/api/journal/delete', async (req, res) => {
    const response = await Journal.del({ username: req.user.username, id: req.body.id });
    res.send(response);
  });
  app.get('/api/journal/all', async (req, res) => {
    const response = await Journal.getAll({ username: req.user.username });
    res.send(response);
  });
};
