import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import FormData from 'form-data';

const axios = require("axios");

export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fileList: [],
          uploading: false,
          accessToken: "",
          alertMessage: ""
        };
    }

    authorization = () => {
        fetch("http://localhost:8888/oauth")
            .then(res => res.text())
            .then(res => {
              this.setState({ accessToken: JSON.parse(res) });
            });
    }

    componentWillMount() {
      this.authorization();
    }

    handleUpload = () => {
      const token = this.state.accessToken;
      const { fileList } = this.state;

      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('middlewaretoken', token);
        formData.append('files', file);
      });

      const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
      };

      this.setState({
        uploading: true,
      });
      if (this.state.accessToken === "") {
        this.setState({ alertMessage: "authorization faild! please check your id and secret Key." })
      } else {
        axios.post("http://localhost:8888/upload",formData,config)
            .then((response) => {
                this.setState({
                  fileList: [],
                  uploading: false,
                });
                this.fetchResult(response.data.fileId);
                message.success('upload successfully.');
            }).catch((error) => {
              this.setState({
                uploading: false,
              });
              message.error('upload failed.');
        });
      }
    };

    fetchResult = (fileId) => {
      const config = {
          headers: { 'Content-Type': 'application/json' },
          data: {
            'fileId': fileId,
            'token': this.state.accessToken
          }

      };
      axios.post("http://localhost:8888/result",config)
          .then((response) => {
            this.props.handler(response.data);
            message.success('result fetching successfully.')
          }).catch((error) => {
            console.log(error);
            message.error('result fetching failed.')
      });
    }

    render() {
        const { uploading, fileList } = this.state;
        const props = {
          onRemove: file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          },
          beforeUpload: file => {
            this.setState(state => ({
              fileList: [...state.fileList, file],
            }));
            return false;
          },
          fileList,
        };
        return (
          <div class="upload-pannel">
            <Upload {...props} >
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </div>
        )
    }
}
