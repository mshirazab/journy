const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireMobx = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config); // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@layout-header-background': '#564787', '@primary-color': '#564787' },
  })(config, env);
  config = rewireMobx(config, env);
  return config;
};
