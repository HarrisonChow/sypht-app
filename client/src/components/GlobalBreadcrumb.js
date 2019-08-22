import React from 'react';
import { Breadcrumb } from 'antd';

export default class GlobalBreadcrumb extends React.Component {

    render() {
        return (
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        )
    }
}
