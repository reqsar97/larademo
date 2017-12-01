import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Redirect } from 'react-router-dom'

export default class UpdateCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			errorName: '',
			hasError: false,
			isUpdateCategory: false
		}
		this.onHandleChangeName = this.onHandleChangeName.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		console.log(this.props);

	}

	onHandleChangeName(e){
		let value = e.target.value;
		this.setState({
			name: value
		})
	}

	onHandleSubmit(e){
		e.preventDefault();
		let name = this.state.name;
		let id = this.props.match.params.categoryId;
		axios.post(`/api/category/update/${id}`, {
			name: name,
		    token: localStorage.getItem('token')
		  }).then( (response) => {
		   	console.log(response.status);
		   	this.setState({
		   		isUpdateCategory: true
		   	});
		   	this.props.onAddCategory();
		  }).catch( (error) => {
		  	console.log(error);
        	var errors = error.response.data.errors;
        	this.setState({errorName: errors.name});
		  });
	}

	render(){
		let redirect = this.state.isUpdateCategory && <Redirect to='/categories' />

		return (
		    <div className="row">
		    	<h3>Update category</h3>
		        <div className="col-md-6 col-md-offset-0.5">
		            <div className="panel panel-default">
		                <div className="panel-body">
		                    <form method="POST" action="#">

		                        <div className="form-group">
		                            <label htmlFor="name">Name:</label>
		                            <input type="text" className="form-control" id="name" name="name" onChange={this.onHandleChangeName}/>
		                            <span className="help-block">
                                        		<strong>{ this.state.errorName }</strong>
                                    		</span>
		                        </div>

		                        <button type="submit" className="btn btn-primary" onClick={this.onHandleSubmit}>Update</button>
		                    </form>
		                </div>
		            </div>
		        </div>
		        {redirect}
		    </div>
		);
	}
}