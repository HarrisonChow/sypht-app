import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header } = Layout;

export default class GlobalHeader extends React.Component {

    render() {
        return (
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">About us</Menu.Item>
              <Menu.Item key="3">Contact us</Menu.Item>
            </Menu>
          </Header>
        )
    }
}
