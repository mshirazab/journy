const prod = require('./prod');
const dev = require('./dev');
const test = require('./test');

switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = prod;
    break;
  case 'test':
    module.exports = test;
    break;
  default:
    module.exports = dev;
}
