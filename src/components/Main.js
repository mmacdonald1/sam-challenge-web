import React,{Component} from 'react'
import Scatter from './Scatter.js'
import Line from './Line.js'

class Main extends Component{
  constructor(props) {
    super(props);

    this.state = {
      scatterData: []
    };
  }

  componentDidMount() {
    //on build retrieve data
    this.getData()
  }

  getData=()=>{
    //get data by num rows
    fetch('http://localhost:3000/plants/200/getByNumRows')
    .then(resp => resp.json())
    .then(data =>{
      if(!data.error){
          this.aggregateByPlant(data)
      }
    })
  }

  aggregateByPlant=(data)=>{
    let plantsObj={}

    //for each data obj grab relevent keys, store value in array, and increment count
    data.forEach((item, i) => {
      for (const [key, value] of Object.entries(item)) {
        //if key does not exist add it else add value to array
        if(!plantsObj[key] && key !== "createdAt" && key !== "updatedAt"&& key !== "id"){
          plantsObj[key]={}
          plantsObj[key].arr = []
          plantsObj[key].arr.push(value)
        }else if(key !== "createdAt" && key !== "updatedAt"&& key !== "id"){
          plantsObj[key].arr.push(value)
        }
      }
    });
    this.aggregateFrequency(plantsObj)
  }

  aggregateFrequency=(plantsObj)=>{
    let plantData=[]
    //for each plant object count frequency that each number occurs
    for (const [key, value] of Object.entries(plantsObj)) {
      let plantObj = {}
      plantObj.label = key
      let freqObj={}
      value.arr.forEach((item, i) => {
        if(!freqObj[item]){
          freqObj[item] = 1
        }else{
          freqObj[item] = freqObj[item] +1
        }
      });
      plantObj.data = freqObj
      plantData.push(plantObj)
    }
    this.formatChartData(plantData)
  }

  formatChartData=(plantData)=>{
    //format count to x, frequency to y, and add chart.js styles
    let colors=["#c73e82","#39d7fa","#2196f3","#ffa600", "#45de02"]
    let backColor=["#f2b8d5","#b3f1ff","#8ac1ed","#ffd380","#b5f09c"]
    plantData.forEach((item, i) => {
      let finalObj = {}
      finalObj.label = item.label
      finalObj.data=[]
      finalObj.borderColor=colors[i]
      finalObj.backgroundColor= backColor[i]
      finalObj.fill = false
      finalObj.radius = 5
      finalObj.lineTension = .3

      for (const [key, value] of Object.entries(item.data)) {
        let obj={}
        obj.y = value
        obj.x = key
        finalObj.data.push(obj)

      }
      //set state
      this.setState({scatterData: [...this.state.scatterData, finalObj]})
    })
  }


  render(){
    return(
      <div class="container">
        <div class="header-div">
          <img class="plant-img" src="plant.png"/>
          <h1 class="title-text">Mel's Code Challenge</h1>
          <img class="plant-img" src="plant.png"/>
        </div>
        <div className="sub chart-wrapper">
          {/* If data then render line graph */}
          {this.state.scatterData && this.state.scatterData[0] ? <Line data={this.state.scatterData}/>: null}
        </div>
      </div>
    )
  }
}

export default Main
