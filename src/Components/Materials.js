import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

var i;

function DeleteMaterial(ID) {

    var confirmation = prompt("Confirm that you want to delete this material","I confirm");
    if (confirmation != null) {
        console.log(ID)
        axios.delete('http://localhost:4000/Materials/'+ID)    
    }
}

export default class MaterialsList extends Component {

    constructor(props) {
        super(props);
        this.state = {mList: [],ownList: [], materials: []};
    }


    componentDidMount = () => {
        axios.get('http://localhost:4000/Materials/')
        .then(response => {
  
          var totalData = response.data
          var filteredData = []
          var ownData = []

          console.log(totalData)
  
          //filter for deletable
          for (i = 0; i < totalData.length; i++) {
            if(totalData[i].material_deletable === true){
                filteredData.push(totalData[i])
            }
            if(totalData[i].material_deletable === false){
                ownData.push(totalData[i])
            }
          }
            console.log(filteredData);
            console.log(ownData);
            this.setState({props: totalData});
            this.setState({mList: filteredData});
            this.setState({ownList: ownData});           
  
        })
        .catch(function (error){
            console.log(error);
        })
      }

    render() {

        var MaterialList =
        this.state.mList.map((element)=>{
            return <tr>
            <td>{element.material_category}</td>
            <td>{element.material_name}</td>
            <td>{element.material_lambda}</td>
            <td>{element.material_price}</td>
            <td>
                <button class="deletematerialbutton" onClick={()=> DeleteMaterial(element._id)}>
                𝗫
                </button>
            </td>
            </tr>
        })

        var OwnMaterialsList =
        this.state.ownList.map((element)=>{
            return <tr>
            <td>{element.material_category}</td>
            <td>{element.material_name}</td>
            <td>{element.material_lambda}</td>
            <td>{element.material_price}</td>
            </tr>
        })

        
        return (
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
                <h3>User Materials</h3>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Lambda</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {MaterialList}
                    </tbody>
                </table>
                <h3>Ready materials</h3>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Lambda</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {OwnMaterialsList}
                    </tbody>
                </table>
            </div>
        )
    }
}