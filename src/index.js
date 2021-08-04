import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { InfoProvider } from './Components/context'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Homepagina from './Homepagina';
import MaterialsList from './Components/Materials';
import AddMaterial from './Components/create';
import Materials from './Pages/Materials'


ReactDOM.render(
    <InfoProvider>
        <Router>
            <Switch>
                <Route exact path="/" component={Homepagina}/>  
                <Route exact path="/Laag" component={App}/>
                <Route exact path="/Materials" component={Materials}/>
                <Route exact path="/MaterialsList" component={MaterialsList}/>
                <Route exact path="/AddMaterial" component={AddMaterial}/>
            </Switch>
        </Router>
    </InfoProvider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
