import React, { Component } from "react";
import axios from "axios";
import '../App.css';
import { Link } from 'react-router-dom';
import Materials from "../Pages/Materials";

export default class AddMaterial extends Component {

constructor(props) {
super(props);

    this.state = {

        material_category: "",
        material_name: "",
        material_lambda: "",
        material_price: "",
        material_deletable: true,
    }

}

onSubmit = (e) => {

    e.preventDefault();

    console.log(this.state);
       
    console.log(`Form submitted:`);
    console.log(`Material Category: ${this.state.material_category}`);
    console.log(`Material Name: ${this.state.material_name}`);
    console.log(`Material Lambda: ${this.state.material_lambda}`);
    console.log(`Material Price: ${this.state.material_price}`);
    console.log(`Material Deletable: ${this.state.material_deletable}`);

    const materialprop = {
        material_category: this.state.material_category,
        material_name: this.state.material_name,
        material_lambda: this.state.material_lambda,
        material_price: this.state.material_price,
        material_deletable: this.state.material_deletable
    }
 
    axios.post('http://localhost:4000/Materials/', materialprop)
        .then(res => console.log(res.data));

    this.setState({
        material_category: '',
        material_name: '',
        material_lambda: '',
        material_price: '',
        material_deletable: ''
    })
}

changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
}


render() {
    const {material_category, material_name, material_lambda, material_price, material_deletable} = this.state
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

    <h3>Add a New Material</h3>

    <form onSubmit={this.onSubmit}>
        <h5>
            Category
        </h5>
            <div className="form-group">
                <div className="form-check ">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="material_category"
                        id="categoryStructuur"
                        value="structure"
                        checked={this.state.material_category === "structure"}
                        onChange={this.changeHandler}
                    /><p class="materialRadio">structure</p>
                </div>
                <div className="form-check ">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="material_category"
                    id="categoryIsolatie"
                    value="insulation"
                    checked={this.state.material_category === "insulation"}
                    onChange={this.changeHandler}
                /><p class="materialRadio">insulation</p>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="material_category"
                        id="categoryAfwerking"
                        value="finishing coat"
                        checked={this.state.material_category === "finishing coat"}
                        onChange={this.changeHandler}
                    /><p class="materialRadio">finishing coat</p>
                </div>
            </div>

        <h5>
            Name
        </h5>
        <div class="form-group">
            <input
            type="text"
            class="form-control"
            name="material_name"
            defaultValue={material_name}
            onChange={this.changeHandler}
            />
        </div>

        <h5>
            Lambda
        </h5>
        <div class="form-group">
            <input
            type="number"
            class="form-control"
            name="material_lambda"
            defaultValue={material_lambda}
            onChange={this.changeHandler}
            />
        </div>

        <h5>
            Prijs
        </h5>
        <div class="form-group">
            <input
            type="number"
            class="form-control"
            name="material_price"
            defaultValue={material_price}
            onChange={this.changeHandler}
            />
        </div>
        
        <button class="addmaterialbutton">
        <input
        type="submit"
        value="Add Material"
        class="addmaterialinput"
        />
        </button>

    </form>
</div>
);
}
}