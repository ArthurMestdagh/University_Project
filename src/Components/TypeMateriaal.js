import React, {Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {identifyUser} from '../redux/actions/userAction';
import {Dropdown} from 'react-bootstrap'
import axios from 'axios';
//import DropdownItem from 'react-bootstrap/DropdownItem';

import {saveLayerList} from '../redux/actions/userAction';
import {setMaterial} from '../redux/actions/userAction'
import Colorpicker from '../Components/Colorpicker'

export function settingRadioDefault(checkStructuur, checkIsolatie, checkAfwerking){
  document.getElementById("structuur").checked = checkStructuur
  document.getElementById("isolatie").checked = checkIsolatie
  document.getElementById("afwerking").checked = checkAfwerking
}


var i;


//default layerindex op eerste laag zetten
var layerIndex = 0


class TypeMateriaal extends Component{

  constructor(props){
    super(props);
    this.state = {
      selected:'',
      mList: [{materiaal: ''}],
      currentSelection: 'please select a material type first',
      currentLambda: 'The thermal value \u03BB of this material is:',
    }
  }



  dispatchSelectedMaterial = (element) => {
    this.setState({currentSelection: element.material_name, currentLambda: `The thermal value \u03BB of this material is: ${element.material_lambda} W/mK`})
    console.log(element.materiaal)

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

    //2.set material and lambda of current layer
      layerList[layerIndex].materiaal = element.material_name
      layerList[layerIndex].lambda = element.material_lambda
      console.log(element)
      layerList[layerIndex].prijs = element.material_price

    //3.save in layerlist
      this.props.saveLayerList(layerList)
      console.log('updated layerList is:',layerList)

      //updateU
      this.props.recalcudata()

      //update price
      this.props.pricedata()

  }


  componentDidMount() {
    this.saveFunction()
  }


    render(){
        let myOptions = this.state.mList.map((element, i) => {
            return <Dropdown.Item onSelect={() => this.dispatchSelectedMaterial(element)} key={i}>{element.material_name}</Dropdown.Item>
          })


        return(    

        <div>
                  
          <div className ='deleteLayer'>
            <p className ='deleteLayer'  onClick={() => this.deleteLayer()} >[Delete layer]</p>
           </div>

          <div className ='colorComponent'>
              <Colorpicker></Colorpicker>
            <span className="tooltiptext">Change layer color</span>
          </div>
         
         
          


        
        <h2>{this.props.title}</h2>



 
        

        <div className= "category">
        <p>Select a category</p>
        <form>
          
          <div className="radio">
            <input id="structuur" type="radio" name="optradio" onClick={() => {this.getData("structure"); this.setCategory("structuur")}}></input>
            <label onClick={() => {this.getData("structure"); this.setRadio("structuur"); this.setCategory("structuur")}}> Structure </label> 
          </div>
          <div className="radio">
            <input id="isolatie" type="radio" name="optradio"onClick={() => {this.getData("insulation"); this.setCategory("isolatie")}}></input>
            <label onClick={() => {this.getData("insulation"); this.setRadio("isolatie"); this.setCategory("isolatie")}}> Insulation </label>
          </div>
          <div className="radio">
            <input id="afwerking" type="radio" name="optradio"onClick={() => {this.getData("finishing coat"); this.setCategory("afwerking")}}></input> 
            <label onClick={() => {this.getData("finishing coat"); this.setRadio("afwerking"); this.setCategory("afwerking")}}> Finishing coat </label>
          </div>
          
        </form>
        </div>




        <p>Select a material</p>
        <Dropdown className="dropdown">
          <Dropdown.Toggle id="dropdown-basic">
            {this.state.currentSelection}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {myOptions}
          </Dropdown.Menu>
        </Dropdown>
        <p className = 'outputInformation'>{this.state.currentLambda}</p>

      </div>
        )
    }

    //set category in layerList
    setCategory(category){

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

      //2.set type of current layer
        layerList[layerIndex].type = category

      //3.save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)

      }


    getData = (category) => {
      axios.get('http://localhost:4000/Materials/')
      .then(response => {

        var totalData = response.data
        var filteredData = []

        //filter category
        for (i = 0; i < totalData.length; i++) {
          if(totalData[i].material_category === category){
            filteredData.push(totalData[i])
          }
        }
          console.log(filteredData)
          this.setState({mList: filteredData, currentSelection: 'please select a material from the list', currentLambda: ''})

      })
      .catch(function (error){
          console.log(error);
      })
    }  


    setRadio(category){
      document.getElementById(category).checked = true
    }



    updateData = (category) => {
      axios.get('http://localhost:4000/Materials/')
      .then(response => {

        var totalData = response.data
        var filteredData = []

        //filter category
        for (i = 0; i < totalData.length; i++) {
          if(totalData[i].material_category === category){
            filteredData.push(totalData[i])
          }
        }
          console.log(filteredData)
          this.setState({mList: filteredData})

      })
      .catch(function (error){
          console.log(error);
      })
    }  




    



    deleteLayer(){
      this.props.deletedata()
    }


    saveFunction(){
      let setStateFromOutside = ()=> {

        //set current layerindex
        var layerList = this.props.layerListdata
        var currentLayerId = this.props.layerdata
        function searchElement(list){
          return list.naam === currentLayerId
        }
        if (layerList.indexOf(layerList.find(searchElement))!==-1) {
          layerIndex = layerList.indexOf(layerList.find(searchElement))
        }

        //change dropdown value based on current layermaterial
        if(layerList[layerIndex].materiaal!==undefined){
          this.setState({currentSelection: layerList[layerIndex].materiaal,currentLambda:`The thermal value \u03BB of this material is: ${layerList[layerIndex].lambda} W/mK`})
        }
        else{
          this.setState({currentSelection: 'please select a material type first', currentLambda:'The thermal value \u03BB of this material is:'})
        }


        // //updating database to current materialtype
        if(layerList[layerIndex].type === 'structuur'){
          this.updateData('structure')
        }

        if(layerList[layerIndex].type === 'isolatie'){
          this.updateData('insulation')
        }

        if(layerList[layerIndex].type === 'afwerking'){
          this.updateData('finishing coat')
        }


      }

        this.props.setMaterial(setStateFromOutside)

        
    }

}   

// this.props.user = ...
const mapReduxStateToProps = reduxState => ({
    // userdata: reduxState.user.message,
    //typedata: reduxState.type.chosen,
    // lambdadata: reduxState.lambda.result,

    layerListdata: reduxState.layerList.layerList,
    layerdata: reduxState.layer.layer,
    materialdata: reduxState.material.material,
    deletedata: reduxState.delete.delete,

    updaterdata: reduxState.update.update,
    viewdata: reduxState.view.view,
    recalcudata: reduxState.recalcu.recalcu,
    pricedata: reduxState.price.price

})

export default connect(mapReduxStateToProps, {identifyUser,saveLayerList, setMaterial})(TypeMateriaal)



