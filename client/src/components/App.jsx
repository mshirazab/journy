import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { observer, inject } from 'mobx-react';

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
const AsyncDashboard = Loadable({
  loader: () => import('./Dashboard'),
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

@inject('profileStore')
@observer
class App extends Component {
  static propTypes = {
    profileStore: PropTypes.shape({
      getUser: PropTypes.func,
      username: PropTypes.string,
    }),
  };
  static defaultProps = {
    profileStore: {},
  };
  render() {
    let routes = <Loading />;
    this.props.profileStore.getUser();
    if (!this.props.profileStore.username) {
      routes = (
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
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" render={props => <AsyncDashboard {...props} styleProps={styleProps} />} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout styleProps={styleProps}>
        <BrowserRouter>{routes}</BrowserRouter>
      </Layout>
    );
  }
}
export default App;
