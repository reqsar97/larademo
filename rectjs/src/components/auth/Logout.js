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
		let self = this;
		axios.post('/api/logout', {
			token: localStorage.getItem('token')
		  })
		  .then(function (response) {
		    // console.log(response);
		    console.log(response.data);
		    localStorage.clear();
		    localStorage.setItem('isLogged', 0);
		    self.props.onLogout();
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}

	// methods
	render(){
		return <Redirect to='/'/>
	}
}

export default Logout;
