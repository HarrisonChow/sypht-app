import React from 'react';
import { Table } from 'antd';
import BarChart from './BarChart';

const axios = require("axios");

export default class FileList extends React.Component {

    render() {
      const columns = [
        { title: 'file ID', dataIndex: 'fileId', key: 'fileId' },
      ];
      const data = [];
      const sum = {};

      this.props.fileList.forEach(function(element) {
        let description = "";
        let invoiceYear, total = 0;

        element.results.fields.forEach(function(field) {
          if (field.name === "document.type") {
            Object.keys(field.value).forEach(function (item) {
              if ((field.value)[item].value === true) {
                description = description.concat(field.name + " : " + item + "      |      ");
              }
            });
          } else {
            description = description.concat(field.name, " : " , field.value , "      |      ");
          }
          if (field.name === "document.date") {
            invoiceYear = field.value.substring(0, 4);
          }

          if (field.name === "invoice.total") {
            total = parseFloat(field.value);
          }

          if (field.name === "document.supplierABN") {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                data: {
                  'abn': field.value
                }
            };
            // axios.post("http://localhost:8888/abn",config)
            //     .then((response) => {
            //       console.log(response, "abn");
            //     }).catch((error) => {
            //       message.error('fetch ABN failed.');
            // });
          }


        });

        if (!sum[invoiceYear]) {
          sum[invoiceYear] = total;
        } else {
          sum[invoiceYear] += total;
        }


        const item = {};
        item.key = element.fileId;
        item.fileId = element.fileId;
        item.description = description;
        data.push(item);

      });


        return (
          <div>

          <Table
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
          />

          <BarChart data={sum}/>
          </div>
        )
    }
}
