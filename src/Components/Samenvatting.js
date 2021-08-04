import React, { Component } from 'react';
import {connect} from 'react-redux'
import {updateU} from '../redux/actions/userAction'
import {setTotalU} from '../redux/actions/userAction'

var textOutput = ''
var valueOutput = ''
var unitOutput =''



class Samenvatting extends Component {
  constructor(){
    super();
    this.state = {UvalueElement: ''}
  }


  componentDidMount() {
    this.saveFunction()
  }


  render(){

    //R-waardes halen uit Uwaardes van layerlist
   var layerList = this.props.layerListdata

    var rWaardes = layerList.map(function(layer){
      return 1/ layer.UWaarde;
      })

    //R van overgangscoëfficiënten
    rWaardes.push(0.13,0.04)

    //Verwijder NaN
    var rWaardesNumbers = rWaardes.filter(Boolean)

    // Uwaarde totaal
    var totalU = 1 / rWaardesNumbers.reduce((a, b) => a + b)

    if (totalU === 1/0.17) {
      textOutput = 'Define your layer properties to see the overall U-value'
      valueOutput = ''
      unitOutput ='' 
      
    } else {
      textOutput ='The total u-value is '
      valueOutput =  totalU.toFixed(3)
      unitOutput = ' W/m\xB2K'

      this.props.setTotalU(valueOutput)
    } 



    if(this.props.totalpricedata===undefined){
      var priceTextOutput = 'Define your layer properties to see the overall estimated price'
      var priceValueOutput = ''
      var priceUnitOutput = ''
    }if(isNaN(this.props.totalpricedata)===true){
      var priceTextOutput = 'Define your layer properties to see the overall estimated price'
      var priceValueOutput = ''
      var priceUnitOutput = ''
    }else{
      var afgerond = this.props.totalpricedata.toFixed(2)
      var priceTextOutput = 'The total estimated price is ' 
      var priceValueOutput = afgerond
      var priceUnitOutput = ' euro'
    }


    
    





    return(

      <div>
        <p>{priceTextOutput}{priceValueOutput}{priceUnitOutput}</p>
        <p>{textOutput}{valueOutput}{unitOutput}</p>
      </div>


      
    )
  }


  //function to update global u-value as soon as new thickness of material is given
  saveFunction(){
    let setStateFromOutside = ()=> {
      this.setState({UvalueElement:valueOutput}); 
    }

    this.props.updateU(setStateFromOutside)
  }


  
}



const mapReduxStateToProps = reduxState => ({
  // userdata: reduxState.user.message,
  
  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,
  updaterdata: reduxState.update.update,
  totaludata: reduxState.totalu.totalu,
  totalpricedata: reduxState.totalprice.totalprice,
  

})

export default connect(mapReduxStateToProps,{updateU, setTotalU})(Samenvatting)
