import React, { Component } from 'react';
import axios from "axios";
import {
    Redirect
} from 'react-router-dom'

class Login extends Component{

	constructor(props){
		super(props);

		let isLogged = localStorage.getItem('isLogged');

		if (isLogged == 1) {
			isLogged = true;
		}else{
			isLogged = false;
		}

		let fieldError = {
			email: '',
			password: ''

		}

		this.state = {
			email: '',
			password: '',
			isLogged: isLogged,
			hasError: false,
			errors: fieldError
		};

		console.log(this.state.isLogged);

		this.onHandleChangeEmail = this.onHandleChangeEmail.bind(this);
		this.onHandleChangePassword = this.onHandleChangePassword.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleChangeEmail(e){
		const email = e.target.value;
		this.setState({email: email});
	}

	onHandleChangePassword(e){
		const password = e.target.value;
		this.setState({password: password});	
	}

	onHandleSubmit(e){
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		const self = this;
		axios.post('/api/login', {
		    email: email,
		    password: password
		  })
		  .then(function (response) {
		    
		  	localStorage.setItem('token', response.data.token);
		  	localStorage.setItem('name', response.data.name);
		  	localStorage.setItem('isLogged', 1);

		    self.props.onLogin(true);
		    self.setState({isLogged: true});
		  })
		  .catch(function (error) {
		    var errors = error.response.data.errors;
		    console.log(errors);
        	self.setState({
        		hasError: true,
        		errors: errors
        	});
		  });
	}

    render(){

    	let fieldError = {
			name: '',
			email: '',
			password: ''

		}

		if(this.state.hasError){
			for(let error in this.state.errors){
				fieldError[error] = this.state.errors[error][0];
			}
		}
    	
    	let redirect = this.state.isLogged ? <Redirect to="api" /> : null;
        return (

        	<div className="container">
			    <div className="row">
			        <div className="col-md-8 col-md-offset-2.5">
			            <div className="panel panel-default">
			                <div className="panel-heading">Login</div>

			                <div className="panel-body">
			                    <form className="form-horizontal" method="POST" action="#">

			                        <div className="form-group">
			                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

			                            <div className="col-md-6">
			                                <input id="email" type="email" className="form-control" name="email" value={this.state.email} required autoFocus onChange={this.onHandleChangeEmail}/>
			                                <span className="help-block">
                                        		<strong>{ fieldError['email'] }</strong>
                                    		</span>
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <label htmlFor="password" className="col-md-4 control-label"  >Password</label>

			                            <div className="col-md-6">
			                                <input id="password" type="password" className="form-control" onChange={this.onHandleChangePassword} value={this.state.password} name="password" required />
			                                <span className="help-block">
                                        		<strong>{ fieldError['password'] }</strong>
                                    		</span>
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <div className="col-md-6 col-md-offset-4">
			                                <div className="checkbox">
			                                    <label>
			                                        <input type="checkbox" name="remember" /> Remember Me
			                                    </label>
			                                </div>
			                            </div>
			                        </div>

			                        <div className="form-group">
			                            <div className="col-md-8 col-md-offset-4">
			                                <button type="submit" className="btn btn-primary" onClick={this.onHandleSubmit}>
			                                    Login
			                                </button>

			                                <a className="btn btn-link" href="{{ route('password.request') }}">
			                                    Forgot Your Password?
			                                </a>
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

export default Login;



