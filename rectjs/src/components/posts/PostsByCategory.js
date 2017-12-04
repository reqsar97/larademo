import React, { Component } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

export default class PostsByCategory extends Component {
	constructor(props) {
		// code
		super(props)
		let categoryId = this.props.match.params.categoryId;
		this.state = {
			categoryId: categoryId,
			posts: [],
			ajaxDone: false,
			update: false
		}
	}

	getAllPostsByCategory(categoryId){
		axios.get(`/api/posts/category/${categoryId}`)
			.then((response)=>{
				console.log("ajaxDone");
				console.log(response.data.posts.data);
			  	let data = response.data.posts.data;
			  	this.setState({
			  		posts: data,
			  		ajaxDone: true,
			  	});
			})
			.catch((error)=>{
				console.log(error);
			});
	}

	componentDidMount(){
		let categoryId = this.props.match.params.categoryId;
		this.getAllPostsByCategory(categoryId);
	}

	componentWillReceiveProps(nextProps){
		let categoryId = this.props.match.params.categoryId;
		let NextcategoryId = nextProps.match.params.categoryId;
		if(categoryId != NextcategoryId){
			this.getAllPostsByCategory(NextcategoryId);
		}
	}

	// methods
	render(){
		let url = this.props.url;
    	let posts = [];
    	if(this.state.ajaxDone){
    		posts = this.state.posts.map((value) => {
    			let post = <Post
    						  body={value.body}
    						  category={value.category.name}
    						  id={value.id}
    						  key={value.id}
    						  title={value.title}
    						  createdAt={value.created_at}
    						  author={value.user.name}
    						  img={value.img_url}
    						  url={'posts'}
    						  parrentUrl="post"
    						  singlePost={false}
    						 />;
    			return post;
    		});
    	}
		return (
	    	<div>
				<div className="row">	
			        <div className="col-md-offset-3">
			            <div >
			            	{posts}
			            </div>
			        </div>
			    </div>
	    	</div>
		);
	}
}