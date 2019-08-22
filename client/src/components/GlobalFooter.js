import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

export default class GlobalFooter extends React.Component {

    render() {
        return (
          <Footer style={{ textAlign: 'center' }}>Sypht test ©2019 Created by Harrison Chow</Footer>
        )
    }
}
