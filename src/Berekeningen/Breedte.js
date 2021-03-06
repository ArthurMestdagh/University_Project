import React, { Component } from 'react';

import '../App.css'
import {connect} from 'react-redux'
import {saveLayerList} from '../redux/actions/userAction';
import {recalcU} from '../redux/actions/userAction';

// import {getLambda} from '../redux/actions/userAction';


export function settingInputDefault(width){
  document.getElementById("Breedte").value = width
}


var layerIndex = 0

class Uwaarde extends Component{
    constructor(){
        super();
        this.state = {
          textOutput:'Layer thermal performance:',
          currentSelection:'',
        };
      }


      componentDidMount() {
        this.saveFunction()
      }


      render(){


          return(

              <div className="breedteberekening">
                  <p>Suggest a width</p>
                  <div className="breedteinput">
                    <input onChange={() => this.Uwaarde()} className='input' id="Breedte" type="number" step = "1" onchange={()=>this.value = this.value.replace(/,/g, '.')}>
                    </input><p className ='units'>cm</p>
                   </div>
                  {/* <p className = 'outputInformation'>{this.state.textOutput}</p> */}
              </div>
          )
      }


      Uwaarde(){

      //steps for changing layer properties
      //1.set current layerindex
      var layerList = this.props.layerListdata
      var currentLayerId = this.props.layerdata
      function searchElement(list){
        return list.naam === currentLayerId
      }
      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
       layerIndex = layerList.indexOf(layerList.find(searchElement))
      }

      //2.calculate U-value
        var a = parseFloat(document.getElementById("Breedte").value); 
        var b = layerList[layerIndex].lambda ;
        var UwaardeBerekening = b / a * 100;
        var afgerond = UwaardeBerekening.toFixed(3)
        var answer = afgerond + " W/m\xB2K"
        console.log(answer); 
        if (answer !== 'NaN W/m\xB2K'){
        this.setState({textOutput: 'Layer thermal performance:' + answer})
        }else{
          this.setState({textOutput: 'This is not a valid thickness'})
        }



      //2.set thickness and u-value of current layer
        layerList[layerIndex].dikte = parseInt(document.getElementById("Breedte").value)
        layerList[layerIndex].UWaarde = UwaardeBerekening

      //3.save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)


      //Update global U-value
        this.props.updaterdata()


      //Update 3D-view
        this.props.viewdata()

      //update price
      this.props.pricedata()
    }






    saveFunction(){
      let setStateFromOutside = ()=> {

      //steps for changing layer properties
      //set current layerindex
      var layerList = this.props.layerListdata
      var currentLayerId = this.props.layerdata
      function searchElement(list){
        return list.naam === currentLayerId
      }
      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
       layerIndex = layerList.indexOf(layerList.find(searchElement))
      }

      //calculate U-value
        var a = layerList[layerIndex].dikte; 
        var b = layerList[layerIndex].lambda ;
        var UwaardeBerekening = b / a * 100;

      //set material and lambda of current layer
        layerList[layerIndex].UWaarde = UwaardeBerekening

      //save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)

      //Update global U-value
        this.props.updaterdata()

      //update price
        this.props.pricedata()
      }
  
      this.props.recalcU(setStateFromOutside)
    }



    


}





// this.props.user = ...
const mapReduxStateToProps = reduxState => ({
    // lambdadata: reduxState.lambda.result,
    // userdata: reduxState.user.message,

    updaterdata: reduxState.update.update,

    layerListdata: reduxState.layerList.layerList,
    layerdata: reduxState.layer.layer,
    viewdata: reduxState.view.view,
    recalcudata: reduxState.recalcu.recalcu,
    pricedata: reduxState.price.price,
  })



export default connect(mapReduxStateToProps,{saveLayerList, recalcU})(Uwaarde);

