import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Row, Col, Card, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const SignUp = ({ styleProps, form }) => {
  const { getFieldDecorator } = form;
  const onSignInFormSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // TODO: Handle signin when server is commplete
        console.log(values);
      }
    });
  };
  return (
    <Row {...styleProps.row}>
      <Col {...styleProps.small}>
        <Card title="Sign In">
          <Form onSubmit={onSignInFormSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(<Input type="password" placeholder="Password" />)}
            </FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
            <Link to="/signup">{"Don't"} have an account!</Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
SignUp.propTypes = {
  styleProps: PropTypes.shape({
    row: PropTypes.object,
    small: PropTypes.object,
  }),
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }),
};
SignUp.defaultProps = {
  styleProps: {},
  form: {},
};

export default Form.create()(SignUp);
