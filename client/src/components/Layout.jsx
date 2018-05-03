import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { Layout, Row, Col, Button } from 'antd';

const { Header, Content } = Layout;
const AppLayout = ({ styleProps, children, profileStore }) => (
  <Layout>
    <Header>
      <Row {...styleProps.row} justify="space-between">
        <Col>
          <h2>Journy</h2>
        </Col>
        {profileStore.username ? (
          <Col>
            <Button
              type="danger"
              onClick={() => {
                profileStore.logout();
              }}
            >
              Logout
            </Button>
          </Col>
        ) : null}
      </Row>
    </Header>
    <Content {...styleProps.content}>{children}</Content>
  </Layout>
);
AppLayout.propTypes = {
  styleProps: PropTypes.shape({
    row: PropTypes.object,
    big: PropTypes.object,
  }),
  children: PropTypes.element,
  profileStore: PropTypes.shape({
    logout: PropTypes.func,
    username: PropTypes.string,
  }),
};
AppLayout.defaultProps = {
  styleProps: {},
  children: undefined,
  profileStore: {},
};
export default inject('profileStore')(observer(AppLayout));
