import React, {Component} from 'react';
import { Upload, Button, Icon, Table } from 'antd';
import FormData from 'form-data';

const axios = require("axios");




export default class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          files: []
        };
    }

    render() {
      var columns = [
        { title: 'file ID', dataIndex: 'fileId', key: 'fileId' },
      ];

      var data = [];
      this.props.fileList.forEach(function(element) {
        var description = "";
        element.results.fields.forEach(function(field) {
          console.log("field.name",field.name);
          console.log("field.value", field.value);
          if (field.name === "document.type") {
            Object.keys(field.value).forEach(function (item) {
              console.log((field.value)[item].value);

              if ((field.value)[item].value === true) {
                description = description.concat(field.name + " : " + item + "      |      ");
              }
            });
          } else {
            description = description.concat(field.name, " : " , field.value , "      |      ");
          }

        })

        console.log("description",description,"ss");
        var item = {};
        item.key = element.fileId;
        item.fileId = element.fileId;
        item.description = description;
        data.push(item);
      });
      console.log(this.props.fileList);
        return (
          <Table
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
          />
        )
    }
}
