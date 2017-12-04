import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

export default class SinglePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			body: '',
			category: '',
			title: '',
			createdAt: '',
			author: '',
			img: '',
			url: '#'
		};
        
	}

	componentDidMount(){
		let id = this.props.match.params.id;
		axios.get(`/api/posts/${id}`)
		  .then( (response) => {
		  	console.log(response.data.post);
		  	let data = response.data.post;
		  	this.setState({
		  		body: data.body,
		  		category: data.category.name,
		  		title: data.title,
		  		createdAt: data.created_at,
		  		author: data.user.name,
		  		img: data.img_url,
		  	});
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}

	render(){
		let post = <Post
					  body={this.state.body}
					  category={this.state.category}
					  id={this.state.id}
					  title={this.state.title}
					  createdAt={this.state.createdAt}
					  author={this.state.author}
					  img={this.state.img}
					  url={this.state.url}
					  singlePost={true}
					/>;
		return (
			<div className="row">	
			        <div className="col-md-offset-3">
			            <div >
			            	{post}
			            </div>
			        </div>
			    </div>
		);
	}
}