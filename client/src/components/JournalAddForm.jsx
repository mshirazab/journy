import React from 'react';
import PropTypes from 'prop-types';

import { Form, Modal, Input } from 'antd';

const FormItem = Form.Item;

class AddJournalForm extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };
  componentDidMount() {
    console.log('Modal created');
  }
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('heading', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('entry', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<Input type="textarea" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddJournalForm);
