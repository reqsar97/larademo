import React, { Component } from 'react';
import Posts from "./Posts";
import SinglePost from "./SinglePost";
import axios  from "axios";
import { Route,Link } from "react-router-dom";
import UserPosts from "./UserPosts";
import CreatePost from "./CreatePost";
import PostsByCategory from "./PostsByCategory";

export default class PostsRoutController extends Component {
	constructor(props) {
		// code
		super(props)
	}

	render(){
		let url = this.props.match.url;
		return (
			<div>
			<Route exact path={url} render={() => (
				<div>
					<h3>Blog Posts</h3>
					<Posts url={url}/>
      			</div>
	    	)}/>
	    	<Route path={`${url}/post/:id`} component={SinglePost} />
	    	<Route path={`${url}/userPosts`} component={UserPosts} />
	    	<Route path={`${url}/createPost`} component={CreatePost} />
	    	<Route path={`${url}/category/:categoryId`} component={PostsByCategory}/>
	    	</div>
		);
	}
}