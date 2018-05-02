import React from 'react';
import { Spin, Icon } from 'antd';

const Dashboard = () => {
  const antIcon = <Icon type="loading" style={{ fontSize: '56px' }} spin />;
  const marginLeft = (window.innerWidth - 56) / 2;
  const marginTop = (window.innerHeight - 56) / 2;

  return <Spin indicator={antIcon} style={{ marginLeft, marginTop }} />;
};

export default Dashboard;
