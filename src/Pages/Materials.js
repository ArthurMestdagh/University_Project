import React, { Component } from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class Materials extends Component{

    render(){
        
        return(

            
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">

                    <Link className="navhome" to="/">
                        Home
                    </Link>

                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">                        
                            
                            <li className="navbar-item">
                                <Link to="/MaterialsList" className="nav-link">
                                    Material List
                                </Link>
                            </li>


                            <li className="navbar-item">
                                <Link to="/AddMaterial" className="nav-link">                   
                                    Add Material
                                </Link>
                            </li>

                        </ul>
                    </div>

                </nav>

                        
            </div>
            
        )
    }
}

export default Materials