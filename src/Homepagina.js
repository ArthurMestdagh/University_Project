import React, { Component } from 'react';
import './Homepagina.css';
import { Link } from 'react-router-dom';


class Homepagina extends Component {

    render(){

        return(


            <div class="grid">
                <div class="container">
                <Link to="/laag">
                    <img class='afbeelding' src={require('../src/Afbeeldingen/iconUser.png')} alt="wandopbouw"></img>
                </Link>
                    <div class="overflow">
                    <Link to="/laag">
                            <button class='button'>USER</button>
                    </Link>
                    </div>
                </div>
                <div class="container">
                    <Link to="/AddMaterial">
                        <img class='afbeelding' src={require('../src/Afbeeldingen/iconProducer.png')} alt="materiaal toevoegen"></img>
                    </Link>
                    <div class="overflow">
                    <Link to="/AddMaterial">
                        <button class='button'>PRODUCER</button>
                    </Link>
                    </div>
                </div>
            </div>    

        )
            
    }

}

export default Homepagina;
