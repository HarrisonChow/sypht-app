import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

export default class BarChart extends React.Component {

    render() {

      const allLabels = Object.keys(this.props.data);
      const allData = Object.values(this.props.data)
      allLabels.push("Total");
      allData.push(allData.reduce((a, b) => a + b, 0));
      const data = {
        labels: allLabels,
        datasets: [
          {
            label: 'My invoice summary',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: allData
          }
        ]
      };

        return (
          <div>
            <HorizontalBar data={data}/>
          </div>
        )
    }
}
