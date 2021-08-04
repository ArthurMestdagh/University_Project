import React, { Component } from 'react';

import '../App.css'
import {connect} from 'react-redux'

import {updatePrice, savePrice} from '../redux/actions/userAction';

var layerIndex =undefined


class Price extends Component{
    constructor(){
        super();
        this.state = {textOutput:''};
      }


      componentDidMount() {
        this.saveFunction()
      }



      render(){


        return(

            <div>
                <p>Suggest the surface area of the wall </p>
                <div className="areainput">
                  <input onChange={() => this.calculatePrice()} onchange={()=>this.value = this.value.replace(/,/g, '.')} className='input' id="area" type="number" step = "1">
                  </input><p className = 'units'>{'m\xB2'}</p>
                </div>
                <p className = 'outputInformation'>{this.state.Price}</p>
            </div>
        )
      }

      calculatePrice(){
        var area = parseFloat(document.getElementById("area").value) ; 
   
        var layerList = this.props.layerListdata
        
        //calculate total price of all layers
        var i;
        var layerPrices = []

        for (i = 0; i < layerList.length; i++) {
          layerPrices.push(layerList[i].prijs*layerList[i].dikte)
        }

        var pricePerUnitArrea = layerPrices.reduce((a, b) => a + b, 0)


          if(isNaN(area * pricePerUnitArrea)===false){
          var totalPrice = area * pricePerUnitArrea
          this.props.savePrice(totalPrice)}


        //calculate price of current layer
          //set current layerindex
            var layerList = this.props.layerListdata
            var currentLayerId = this.props.layerdata
            function searchElement(list){
            return list.naam === currentLayerId
            }
            if (layerList.indexOf(layerList.find(searchElement))!==-1) {
             layerIndex = layerList.indexOf(layerList.find(searchElement))
            }
            if(layerIndex === undefined){
              layerIndex = 0
            }
          
            var singlePrice = layerList[layerIndex].prijs * layerList[layerIndex].dikte * area
            var afgerond = singlePrice.toFixed(2)

            var textOutput = "The estimated price of this layer is " + afgerond + " euro."
        
            if(textOutput !== 'The estimated price of this layer is NaN euro.'){ 
              console.log(textOutput); 
              this.setState({Price: textOutput}) 
            }
        
      }







      saveFunction(){
        let setStateFromOutside = async ()=> {

          const waiting = await 'waiting'
          
          var area = parseFloat(document.getElementById("area").value) ; 
   
          var layerList = this.props.layerListdata
          
          //calculate total price of all layers
          var i;
          var layerPrices = []
  
          for (i = 0; i < layerList.length; i++) {
            layerPrices.push(layerList[i].prijs*layerList[i].dikte)
          }
  
          var pricePerUnitArrea = layerPrices.reduce((a, b) => a + b, 0)
  
          if(isNaN(area * pricePerUnitArrea)===false){
          var totalPrice = area * pricePerUnitArrea
          this.props.savePrice(totalPrice)}
  
  
          //calculate price of current layer
            //set current layerindex
              var layerList = this.props.layerListdata
              var currentLayerId = this.props.layerdata
              function searchElement(list){
              return list.naam === currentLayerId
              }
              if (layerList.indexOf(layerList.find(searchElement))!==-1) {
               layerIndex = layerList.indexOf(layerList.find(searchElement))
              }
              if(layerIndex === undefined){
                layerIndex = 0
              }



              if(layerList[layerIndex].type===undefined){

                  this.setState({Price: ''})

              }

 
           
              var singlePrice = layerList[layerIndex].prijs * layerList[layerIndex].dikte * area
              var afgerond = singlePrice.toFixed(2)
  
              var textOutput = "The estimated price of this layer is " + afgerond + " euro."
          
              if(textOutput !== 'The estimated price of this layer is NaN euro.'){ 
                console.log(textOutput); 
                this.setState({Price: textOutput}) 
              }


        }
        
        this.props.updatePrice(setStateFromOutside)
      }









}


const mapReduxStateToProps = reduxState => ({
  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,
  pricedata: reduxState.price.price,
  totalpricedata: reduxState.totalprice.totalprice,
})

export default connect(mapReduxStateToProps,{updatePrice, savePrice})(Price);