import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import { message } from 'antd';
import Layout from './Layout';
import Loading from './Loading';

const AsyncSignIn = Loadable({
  loader: () => import('./SignIn'),
  loading: Loading,
});
const AsyncSignUp = Loadable({
  loader: () => import('./SignUp'),
  loading: Loading,
});

const styleProps = {
  row: {
    type: 'flex',
    justify: 'center',
  },
  big: {
    span: 24,
    md: { span: 12 },
  },
  small: {
    span: 24,
    md: { span: 8 },
  },
  content: {
    style: {
      padding: '12px',
    },
  },
};
class App extends Component {
  componentWillReceiveProps(props) {
    if (props.error && this.props.error !== props.error) {
      message.error(props.error);
    }
  }
  render() {
    return (
      <Layout styleProps={styleProps}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={props => <AsyncSignIn {...props} styleProps={styleProps} />}
            />
            <Route
              path="/signup"
              render={props => <AsyncSignUp {...props} styleProps={styleProps} />}
            />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </Layout>
    );
  }
}
App.propTypes = {
  error: PropTypes.string,
};
App.defaultProps = {
  error: '',
};
export default App;
