import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Row, Col, Card, Form, Input, Button } from 'antd';

const FormItem = Form.Item;
class SignUp extends Component {
  state = {
    confirmDirty: false,
  };
  onSignInFormSubmit = (e) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // TODO: Handle Signup when server is complete
        console.log(values);
      }
    });
  };
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row {...this.props.styleProps.row}>
        <Col {...this.props.styleProps.small}>
          <Card title="Sign Up">
            <Form onSubmit={this.onSignInFormSubmit}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input placeholder="Username" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your password!' },
                    { validator: this.validateToNextPassword },
                  ],
                })(<Input type="password" placeholder="Password" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('confirm', {
                  rules: [
                    { required: true, message: 'Please confirm your password!' },
                    { validator: this.compareToFirstPassword },
                  ],
                })(
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    onBlur={this.handleConfirmBlur}
                  />,
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Register
              </Button>
              <Link to="/login">Already have an account!</Link>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
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
