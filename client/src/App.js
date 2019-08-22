import React from 'react';
import GlobalHeader from './components/GlobalHeader';
import GlobalBreadcrumb from './components/GlobalBreadcrumb';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import GlobalFooter from './components/GlobalFooter';
import 'antd/dist/antd.css';
import './App.css';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileIdList: [],
    };
    this.handler = this.handler.bind(this)
  }
  handler(val) {
    var allList=[];
    allList = this.state.fileIdList.concat(val);
    this.setState({
      fileIdList: allList
    })
  }

  render() {
    return (
      <Layout>
        <GlobalHeader />

        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <GlobalBreadcrumb />
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <UploadFile  handler={this.handler} />
            <FileList fileList = {this.state.fileIdList} />
          </div>
        </Content>
        <GlobalFooter />
      </Layout>
    );
  }
}

export default App;
