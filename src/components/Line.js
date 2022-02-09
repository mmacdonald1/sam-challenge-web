import React, { Component } from "react";
var Chart = require("chart.js");

class Line extends Component {
  constructor(props) {
    super(props);
    //grab reference value
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    //on update add to data
    this.myChart.data.datasets = this.props.data;
    this.myChart.update();
  }
  componentDidMount() {
    //Chart js line graph settings
    this.myChart = new Chart(this.canvasRef.current, {
      type: "line",
      data: {
        datasets: this.props.data,
      },
      options: {
        title: {
          display: true,
          text: "Number of House Plants Bought at Lowes Daily",
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Number of Plants Purchased A Day",
              },
            },
          ],
          yAxes: [
            {
              position: "left",
              scaleLabel: {
                display: true,
                labelString: "Frequency of Plant Amount Sold",
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return <canvas id="myCanvas" ref={this.canvasRef} />;
  }
}

export default Line;
