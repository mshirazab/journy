import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { Row, Col, List, Button, Card, Modal } from 'antd';
import FlipMove from 'react-flip-move';

import JournalAddForm from './JournalAddForm';

const { confirm } = Modal;

@inject('profileStore')
@observer
class Dashboard extends Component {
  static propTypes = {
    styleProps: PropTypes.shape({
      row: PropTypes.object,
      big: PropTypes.object,
    }).isRequired,
    profileStore: PropTypes.shape({
      getJournals: PropTypes.func,
      journals: PropTypes.object,
      addJournal: PropTypes.func,
    }).isRequired,
  };
  state = {
    visible: false,
  };
  componentWillMount() {
    this.props.profileStore.getJournals();
  }
  onDelete = (id) => {
    const { profileStore } = this.props;
    confirm({
      title: 'Do you want to delete these items?',
      okText: 'Yes!',
      okType: 'danger',
      onOk() {
        profileStore.deleteJournal(id);
      },
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.profileStore.addJournal(values.heading, values.entry);
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  render() {
    return (
      <Row {...this.props.styleProps.row}>
        <Col {...this.props.styleProps.big}>
          <Card
            title="Journals"
            extra={
              <div>
                <Button onClick={this.showModal}>Add journal</Button>
                <JournalAddForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
              </div>
            }
          >
            <FlipMove duration={750} easing="ease-out">
              <List
                itemLayout="horizontal"
                dataSource={this.props.profileStore.journals}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button type="danger" onClick={() => this.onDelete(item.id)}>
                        Delete
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.heading} - ${new Date(Number(item.time)).toLocaleDateString()}`}
                      description={item.entry}
                    />
                  </List.Item>
                )}
              />
            </FlipMove>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
