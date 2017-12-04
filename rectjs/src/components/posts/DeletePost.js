import React, { Component } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

export default class DeletePost extends Component {
	constructor(props) {
		// code
		super(props);
		this.state= {
			redirect:false
		}
	}

	componentDidMount(){
		let id = this.props.match.params.id;
		axios.post(`/api/post/delete/${id}`,{
			token: localStorage.getItem('token')
		}).then( (response) => {
			console.log(response);
			this.setState({
				redirect:true
			})
		}).catch( (error) => {
			console.log(error);
		});
	}

	// methods
	render(){

		return (
			<div>
				<h1>Post deleted successfully</h1>
				<Link to='/posts/userPosts' replace>
					Return to my posts.
				</Link>
				<Redirect to='/posts/userPosts' />
			</div>
		);
	}
}