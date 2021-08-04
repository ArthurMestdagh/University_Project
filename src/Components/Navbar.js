import React, {Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import Layer from '../Pages/classLaag'
import {connect} from 'react-redux'
import {saveLayerList, saveCurrentLayer, saveDelete, updateColorNavbar, updatePrice} from '../redux/actions/userAction';

import {settingRadioDefault} from '../Components/TypeMateriaal';
import {settingInputDefault} from '../Berekeningen/Breedte';
import {getLambda} from '../redux/actions/userAction';


var arrowLeft = '<'
var arrowRight = '>'

var optieStructuur = false
var optieIsolatie = false
var optieAfwerking = false

var newIndex = ''


var layerList = [new Layer("Layer 1")];
var currentLayerId= ''
var layerIndex = 0


class Navbar extends Component{

  constructor(){
    super();
    this.state = {allLayers: layerList, changeList: ''}
    this.selectLayer = this.selectLayer.bind(this)
  }


      
      componentDidUpdate(){
        //automatisch huidige materiaal aanduiden
        this.props.materialdata()
         //Update 3D-view
          this.props.viewdata()
         //update price
          this.props.pricedata()
        }

      

    componentDidMount() {
        this.saveFunction()
     }



  render(){

    //redux -> save first list
    this.props.saveLayerList(layerList)

    console.log("The new layerlist is",layerList);


    //border-style for navbar


    var myStyle = (props)=>{
    
      //set current layerindex
      var currentLayerId = this.props.layerdata
      console.log(currentLayerId)
    
      if(props.naam === currentLayerId){
        return ({borderBottom: "3px solid", borderBottomColor: props.kleur}
        )}
      if(currentLayerId === undefined){
        return ({borderBottom: "3px solid", borderBottomColor: props.kleur}
        )} else{
        return (
          {borderBottom: "3px solid", borderBottomColor: props.kleur}
        )
      }
    } 





    //function for displaying layers
    var namesList = layerList.map((layer) => {
      return <li className="nav-item">
              <Link to="/laag" className="nav-link"  style={myStyle(layer)} onClick={() => this.selectLayer(layer)} onDoubleClick={()=> this.changeName(layer)}>
                {layer.naam}
              </Link>
              <span className="tooltiptext">Double click to change name</span>
            </li>;
      })


    return (

      <div  className= 'navigation'>
      <nav className="navbar navbar-expand-lg navbar-dark">
        
        <Link className="navhome" to="/" >Home</Link>

        {/* responsive button */}
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span>
            <i className= "fas fa-bars"></i>
            <img src={require('../Afbeeldingen/expand.png')}/>
           </span>
        </button>

        {/* navbar elements */}
                <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <div>{namesList}



            <li onClick={()=>this.moveLeft()} className="nav-item">
              <Link className="nav-link" to="/laag">{arrowLeft}</Link>
              <span className="tooltiptext">Move layer to the left</span>
            </li>

            <li onClick={()=>this.addLayer()} className="nav-item">
              <Link className="nav-link" to="/laag">+</Link>
              <span className="tooltiptext">Add layer</span>
            </li>

            <li onClick={()=>this.moveRight()} className="nav-item">
              <Link className="nav-link" to="/laag">{arrowRight}</Link>
              <span className="tooltiptext">Move layer to the right</span>
            </li>
            </div>
          </ul>
        </div>
    
      </nav>
      </div>
    )
  }


  selectLayer(layerObject) {
    console.log(
      `Current layername: ${layerObject.naam},`,
      `Current layertype: ${layerObject.type},`,
      `Current layermaterial: ${layerObject.materiaal},`,
      `Current layers lambda value': ${layerObject.lambda},`,
      `Current layers thickness: ${layerObject.dikte},`,
      `Current layers u-value: ${layerObject.UWaarde}`
  )

    // save clicked layer as current layer
    this.props.saveCurrentLayer(layerObject.naam)
    
    currentLayerId = layerObject.naam
    function searchElement(list){
      return list.naam === currentLayerId
    }
    var layerIndex = layerList.indexOf(layerList.find(searchElement))

    //automatisch huidige type aanduiden  
    if(layerList[layerIndex].type !== undefined){
      if(layerList[layerIndex].type==="structuur"){
        optieStructuur = true
        optieIsolatie = false
        optieAfwerking = false
      }

      if(layerList[layerIndex].type==="isolatie"){
        optieStructuur = false
        optieIsolatie = true
        optieAfwerking = false
      }

      if(layerList[layerIndex].type==="afwerking"){
        optieStructuur = false
        optieIsolatie = false
        optieAfwerking = true
      }
    }

    else{
      optieStructuur = false
      optieIsolatie = false
      optieAfwerking = false
    }

    settingRadioDefault(optieStructuur,optieIsolatie,optieAfwerking)


    //automatisch huidige breedte aanduiden
    if(layerList[layerIndex].dikte!==undefined){
      settingInputDefault(layerList[layerIndex].dikte)
    }else{
      settingInputDefault('')
    }

    //automatisch huidige kleur aanduiden
    this.props.colordata()
    
  }


//change layer name
  changeName(layerObject){
    var oldName = layerObject.naam
    var newName= prompt("New name of your layer", oldName)

    if(newName!==null){
      function nameExists(list){
        return list.naam === newName
      }

      function searchElement(list){
        return list.naam === oldName
      }


      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
        if (layerList.indexOf(layerList.find(nameExists))===-1) {
          layerIndex = layerList.indexOf(layerList.find(searchElement))
          layerList[layerIndex].naam = newName
        
          this.props.saveLayerList(layerList)
          console.log('updated layerList is:',layerList)
          this.props.saveCurrentLayer(newName)
        } else {
          alert('Please use a unique layer name')
        }
      }
    }
  }




  addLayer(){

    function exampleNameExists(list){
      return list.naam === "Layer " + number
    }

    function nameExists(list){
      return list.naam === givenName
    }

    //add layer
    var number = layerList.length + 1
    
    if (layerList.indexOf(layerList.find(exampleNameExists))===-1){
      var exampleName = "Layer " + number
    } else {
     number =  layerList.length + 2
      var exampleName = "Layer " + number
    }

    var givenName= prompt("Name of your new layer", exampleName);
    if (givenName!==null) {
      if (layerList.indexOf(layerList.find(nameExists))===-1) {
        layerList.push(new Layer(givenName));
      } else {
        alert('Please use a unique layer name')
      }
      
    
    console.log("The new layerlist is",layerList);
    this.setState({allLayers:layerList}); 
    
    //redux -> save new list +  set new layer as curent layer
    this.props.saveLayerList(layerList)
    this.props.saveCurrentLayer(givenName)

    //default: geen type aangeduid
    settingRadioDefault(false,false,false);
    }


    //automatisch kleur wit aanduiden
    this.props.colordata()

    //default: geen dikte
    settingInputDefault('')
  }

  moveLeft(){
   //set current layerindex
   var layerList = this.props.layerListdata
   var currentLayerId = this.props.layerdata
   function searchElement(list){
     return list.naam === currentLayerId
    }
   if (layerList.indexOf(layerList.find(searchElement))!==-1) {
   layerIndex = layerList.indexOf(layerList.find(searchElement))
   }
   
   if(layerIndex!==0){
    //save layer props before deleting and inserting on other index
    var currentLayerProps = layerList[layerIndex]
    //delete layer on current index
    layerList.splice(layerIndex,1)
    //add layer on index to the left
    var newIndex = layerIndex -1
    layerList.splice(newIndex,0,currentLayerProps)

    //save layerlist
    this.props.saveLayerList(layerList)
    this.setState({changeList:'done'});
   }
   //Update 3D-view
   this.props.viewdata()

  }


  moveRight(){
    //set current layerindex
    var layerList = this.props.layerListdata
    var currentLayerId = this.props.layerdata
    function searchElement(list){
      return list.naam === currentLayerId
     }
    if (layerList.indexOf(layerList.find(searchElement))!==-1) {
    layerIndex = layerList.indexOf(layerList.find(searchElement))
    }
    
    var lastIndex = layerList.length -1
    if(layerIndex!==lastIndex){
     //save layer props before deleting and inserting on other index
     var currentLayerProps = layerList[layerIndex]
     //delete layer on current index
     layerList.splice(layerIndex,1)
     //add layer on index to the left
     var newIndex = layerIndex +1
     layerList.splice(newIndex,0,currentLayerProps)
 
     //save layerlist
     this.props.saveLayerList(layerList)
     this.setState({changeList:'done'});

      //Update 3D-view
      this.props.viewdata()
    }
   }


  saveFunction(){
    let deleteLayer= ()=>{
      //set current layerindex
      var layerList = this.props.layerListdata
      var currentLayerId = this.props.layerdata
      function searchElement(list){
       return list.naam === currentLayerId
     }
      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
      layerIndex = layerList.indexOf(layerList.find(searchElement))
    
      //delete current layer
      if(layerList.length!==1){
        layerList.splice(layerIndex,1);
      

        //set new current layer
        if(layerIndex !==0){
          newIndex = layerIndex - 1
        } else {
          newIndex = 0
        }


        this.props.saveCurrentLayer(layerList[newIndex].naam)
    
        currentLayerId = layerList[newIndex].naam
        function searchElement(list){
          return list.naam === currentLayerId
        }
        var layerIndex = layerList.indexOf(layerList.find(searchElement))

          //automatisch huidige type aanduiden  
          if(layerList[layerIndex].type !== undefined){
            if(layerList[layerIndex].type==="structuur"){
              optieStructuur = true
              optieIsolatie = false
              optieAfwerking = false
            }

            if(layerList[layerIndex].type==="isolatie"){
              optieStructuur = false
              optieIsolatie = true
              optieAfwerking = false
          }

            if(layerList[layerIndex].type==="afwerking"){
              optieStructuur = false
              optieIsolatie = false
              optieAfwerking = true
            }
          }

          else{
            optieStructuur = false
            optieIsolatie = false
            optieAfwerking = false
          }

          settingRadioDefault(optieStructuur,optieIsolatie,optieAfwerking)

          //automatisch huidige breedte aanduiden
          if(layerList[layerIndex].dikte!==undefined){
            settingInputDefault(layerList[layerIndex].dikte)
          }else{
            settingInputDefault('')
          }

        //save layerlist
        this.props.saveLayerList(layerList)
        this.setState({changeList:'done'});


      //automatisch huidige kleur aanduiden
      this.props.colordata()

      //Update 3D-view
      this.props.viewdata()
        }

      }
    }

    let updateNavbar = ()=>{
      this.setState({changeList:'done'})
    }
    
    this.props.saveDelete(deleteLayer)
    this.props.updateColorNavbar(updateNavbar)
  }




}

//export default Navbar;

const mapReduxStateToProps = reduxState => ({
  lambdadata: reduxState.lambda.result,
  // userdata: reduxState.user.message,

  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,
  materialdata: reduxState.material.material,
  deletedata: reduxState.delete.delete,
  colordata: reduxState.color.color,
  viewdata: reduxState.view.view,
  colornavbardata: reduxState.colornavbar.colornavbar,
  pricedata: reduxState.price.price,

})

export default connect(mapReduxStateToProps, {saveLayerList,saveCurrentLayer, getLambda, saveDelete, updateColorNavbar})(Navbar)


