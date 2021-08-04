import React, {Component} from 'react'
import '../App.css'
import TypeMateriaal from '../Components/TypeMateriaal'
import Breedte from '../Berekeningen/Breedte'
import Price from '../Berekeningen/Price'
import {connect} from 'react-redux'



var layerName = ''

class Laag extends Component{

    
    render(){

      // define layername
      if (this.props.layerdata !== undefined) {
        layerName = this.props.layerdata
      }
      else{
        console.log(this.props.layerdata)
        layerName = 'Layer 1'
      }


        return(    
      <div>
          

          <TypeMateriaal title={layerName}></TypeMateriaal>
          <Breedte></Breedte>
          <Price></Price>


      </div>
        )
    }

}    



const mapReduxStateToProps = reduxState => ({

  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,

})

export default connect(mapReduxStateToProps)(Laag)
