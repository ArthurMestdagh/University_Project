import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Samenvatting from './Samenvatting';
import UvalueSlider from './UvalueSlider';






class Result extends Component{

  render(){

    return (


      <div>

            <h2 className='resultsTitle'>Results</h2>
            
              <Samenvatting></Samenvatting>
              <UvalueSlider></UvalueSlider>
              {/* <Price></Price> */}

            

        </div>
        

    )

  }

}

export default Result