import React, { Component } from 'react';
import axios from "axios";
import {
    Redirect
} from 'react-router-dom';

export default class Registration extends Component{

	constructor(props){
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			hasError: false,
			success: false,
		}


		this.errors = '';

		//bind functions
		this.onHandleChangeName = this.onHandleChangeName.bind(this);
		this.onHandleChangeEmail = this.onHandleChangeEmail.bind(this);
		this.onHandleChangePassword = this.onHandleChangePassword.bind(this);
		this.onHandleChangePassConfirm = this.onHandleChangePassConfirm.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleChangeName(e){
		const name = e.target.value;
		this.setState({name: name});
		this.errors['name'] = '';
	}

	onHandleChangeEmail(e){
		const email = e.target.value;
		this.setState({email: email});
		this.errors['email'] = '';
	}

	onHandleChangePassword(e){
		const password = e.target.value;
		this.setState({password: password});
		this.errors['password'] = '';
	}

	onHandleChangePassConfirm(e){
		const passwordConfirmation = e.target.value;
		this.setState({passwordConfirmation: passwordConfirmation});
		this.errors['password'] = '';
	}

	onHandleSubmit(e){
		e.preventDefault();

		const name = this.state.name;
		const email = this.state.email;
		const password = this.state.password;
		const passwordConfirmation = this.state.passwordConfirmation;

		const self = this;

		axios.post('/api/register', {
			name: name,
		    email: email,
		    password: password,
		    password_confirmation:passwordConfirmation
		  })
		  .then(function (response) {
		   	self.setState({success: true})
		  })
		  .catch(function (error) {
        	var error = error.response.data.errors;
        	self.errors = error;
        	self.setState({hasError: true});
		  });

	}	


	render(){
		let fieldError = {
			name: '',
			email: '',
			password: ''

		}

		if(this.state.hasError){
			for(let error in this.errors){
				fieldError[error] = this.errors[error][0];
			}
		}

		var redirect = this.state.success && <Redirect to='/login' />

		return (
			<div className="container">

			    <div className="row">
			        <div className="col-md-8 col-md-offset-2.5 ">
			            <div className="panel panel-default">
			                <div className="panel-heading">Register</div>

			                <div className="panel-body">
			                    <form className="form-horizontal" method="POST" action="#">

			                        <div className="form-group">
			                            <label htmlFor="name" className="col-md-4 control-label">Name</label>

			                            <div className="col-md-6">
			                                <input id="name" type="text" className="form-control" name="name" value={this.state.name} onChange={this.onHandleChangeName} required autoFocus />
			                                <span className="help-block">
                                        		<strong>{ fieldError['name'] }</strong>
                                    		</span>
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

			                            <div className="col-md-6">
			                                <input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.onHandleChangeEmail} required />
			                            	<span className="help-block">
                                        		<strong>{ fieldError['email'] }</strong>
                                    		</span>
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <label htmlFor="password" className="col-md-4 control-label">Password</label>

			                            <div className="col-md-6">
			                                <input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.onHandleChangePassword} required />
			                            	<span className="help-block">
                                        		<strong>{ fieldError['password'] }</strong>
                                    		</span>
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <label htmlFor="password-confirm" className="col-md-4 control-label">Confirm Password</label>

			                            <div className="col-md-6">
			                                <input id="password-confirm" type="password" className="form-control" name="password_confirmation" value={this.state.passwordConfirmation} onChange={this.onHandleChangePassConfirm}required />
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <div className="col-md-6 col-md-offset-4">
			                                <button type="submit" className="btn btn-primary" onClick={this.onHandleSubmit}>
			                                    Register
			                                </button>
			                            </div>
			                        </div>
			                    </form>
			                </div>
			            </div>
			        </div>
			    </div>
			    {redirect}
			</div>
		);
	}

}