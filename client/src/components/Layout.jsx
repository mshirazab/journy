import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Row, Col } from 'antd';

const { Header, Content } = Layout;
const AppLayout = ({ styleProps, children }) => (
  <Layout>
    <Header>
      <Row {...styleProps.row}>
        <Col {...styleProps.big}>
          <h2>Journy</h2>
        </Col>
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
};
AppLayout.defaultProps = {
  styleProps: {},
  children: undefined,
};
export default AppLayout;
