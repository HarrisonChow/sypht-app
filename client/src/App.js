import React from 'react';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import 'antd/dist/antd.css';

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
    var allList = this.state.fileIdList.concat(val);
    this.setState({
      fileIdList: allList
    })
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <UploadFile  handler={this.handler} />

        <FileList fileList = {this.state.fileIdList}/>
      </div>
    );
  }
}

export default App;
