import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// React Router Import
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Homepagina from './Homepagina';
import Laag from './Pages/Laag';
import Samenvatting from './Components/Samenvatting';
import UvalueSlider from './Components/UvalueSlider';
import Cube from './Berekeningen/Cube';
import Materials from './Pages/Materials';
import Price from './Berekeningen/Price'
import Result from './Components/Result'

import {Provider} from 'react-redux';
import store from './redux/store';



class App extends Component{

  render(){

    return (

    <Provider store={store}>
      <div>
        <Navbar/>
          <div className="grid-container">
            <div className="grid-links">
              <Switch>
                <Route path="./" component={Homepagina}/>  
                <Route path="/Laag" component={Laag}/>
                <Route path="/Materials" component={Materials}/>
              </Switch>
           </div>


            <div className="grid-rechts">

                
                <Cube></Cube>

                <div className="result-container">
                <div className= 'result'>
                <Result></Result>
                </div>
                </div>

              {/* <div className= 'test'>
              <div className= 'result'>
                <Result></Result>
              </div>
              </div> */}

 

            </div>
           
          </div>
        </div>
        
      </Provider>
    )

  }

}

export default App