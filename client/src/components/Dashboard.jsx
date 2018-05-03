import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card } from 'antd';
import { inject } from 'mobx-react';

@inject('profileStore')
class Dashboard extends Component {
  static propTypes = {
    styleProps: PropTypes.shape({
      row: PropTypes.object,
      small: PropTypes.object,
    }),
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func,
      validateFields: PropTypes.func,
    }),
    profileStore: PropTypes.shape({
      login: PropTypes.func,
    }),
  };
  static defaultProps = {
    styleProps: {},
    form: {},
    profileStore: {},
  };

  render() {
    return (
      <Row {...this.props.styleProps.row}>
        <Col {...this.props.styleProps.small}>
          <Card title="Sign In">Welcome</Card>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
