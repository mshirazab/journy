const Journal = require('../models/journal');

module.exports = (app) => {
  app.post('/api/journal/add', async (req, res) => {
    const response = await Journal.add({ username: req.user.username, entry: req.body.entry });
    res.send(response);
  });
  app.post('/api/journal/delete', async (req, res) => {
    const response = await Journal.del({ username: req.user.username, id: req.body.id });
    res.send(response);
  });
  app.post('/api/journal/modify', async (req, res) => {
    const response = await Journal.modify({
      username: req.user.username,
      id: req.body.id,
      entry: req.body.entry,
    });
    res.send(response);
  });
  app.post('/api/journal/all', async (req, res) => {
    const response = await Journal.getAll({ username: req.user.username });
    res.send(response);
  });
};
