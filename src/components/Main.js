import React,{Component} from 'react'

class Main extends Component{
  componentDidMount(){
    this.getData()
  }

  getData=()=>{
    fetch('http://localhost:3000/plants')
    .then(resp => resp.json())
    .then(console.log)
  }

  render(){
    return(
      <div>
        <h1>Hii</h1>
      </div>
    )
  }
}

export default Main
