import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Row, Col, Card, Form, Input, Button, message } from 'antd';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject('profileStore')
@observer
class SignIn extends Component {
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

  onSignInFormSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.profileStore.login(values.userName, values.password).then((response) => {
          if (!response.success) message.error(response.message);
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row {...this.props.styleProps.row}>
        <Col {...this.props.styleProps.small}>
          <Card title="Sign In">
            <Form onSubmit={this.onSignInFormSubmit}>
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
  }
}

export default Form.create()(SignIn);
