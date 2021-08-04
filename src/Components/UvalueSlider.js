import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../App.css';


var sliderValue = undefined

class UvalueSlider extends Component {
  constructor(){
    super();
    this.state = {UvalueElement: ''}
  }


  render(){
    

  if(this.props.totaludata * 100 === undefined){
      sliderValue = 24
  }else{
    sliderValue = this.props.totaludata * 100
  } 


    return(

<div class="slidercontainer">
    <input type="range" min="0" max="48" value={sliderValue} class="slider" id="myRange"></input>
</div>

      
    )
  }


  
}



const mapReduxStateToProps = reduxState => ({
//   userdata: reduxState.user.message,
  totaludata: reduxState.totalu.totalu
  

})

export default connect(mapReduxStateToProps)(UvalueSlider)
