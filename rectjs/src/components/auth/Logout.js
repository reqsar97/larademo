import React, { Component } from 'react';
import axios from "axios";
import {
    Redirect
} from 'react-router-dom'


class Logout extends Component {
	constructor(props) {
		// code
		super(props)
	}

	componentWillMount(){
		localStorage.setItem('isLogged', 0);
		console.log("Logout");
		axios.post('/api/logout', {
			token: localStorage.getItem('token')
		  })
		  .then( (response) => {
		    // console.log(response);
		    console.log(response.data);
		    localStorage.clear();
		    localStorage.setItem('isLogged', 0);
		    this.props.onLogout();
		  })
		  .catch(  (error) => {
		    let status = error.response.status;
		    if (status==422) {
		    	localStorage.clear();
		    	localStorage.setItem('isLogged', 0);
		    	this.props.onLogout();
		    }
		  });
	}

	// methods
	render(){
		return <Redirect to='/'/>
	}
}

export default Logout;
