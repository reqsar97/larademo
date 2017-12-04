import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import UserSinglePost from "./UserSinglePost";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";

export default class UserPosts extends Component {
	constructor(props){
		super(props);
		this.state = {
			posts: [],
			ajaxDone: false,
			update: false
		}
	}

	getAllUserPosts(){
		axios.get('/api/posts')
		  .then( (response) => {
		  	console.log("Updatic heto mtav stegh?");	
		  	let data = response.data.posts.data;
		  	console.log(data, "Ajaxo mejo")
		  	this.setState({
		  		posts: data,
		  		ajaxDone: true,
		  		update: !this.state.update
		  	});
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}

	componentDidMount(){
		this.getAllUserPosts();
	}


    render(){
    	let url = this.props.match.url;
    	let posts = [];
    	if(this.state.ajaxDone){
    		console.log("stegh hasela");
    		console.log(this.state.posts, "Render meji");
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
    						  url='posts/userPosts'
    						  parrentUrl='post'
    						  singlePost={false}
    						 />;
    			return post;
    		});
    	}

        return (
        	<div>
        		<Route path={`${url}/post/:id`} component={UserSinglePost}/>
        		<Route path={`${url}/deletePost/:id`} component={DeletePost}/>
	    		<Route path={`${url}/updatePost/:id`} component={UpdatePost}/>
	    		<Route exact path={url} render={() => (
					<div className="row">	
					<Link to='/posts/createPost' >
					<h4>Create Post</h4>
					</Link>
					<Link to='/posts/userPosts/post/bob'>
						Bob
					</Link>
			        <div className="col-md-offset-3">
			            <div >
			            	{posts}
			            </div>
			        </div>
			    </div>
	    		)}/>
				
	    	</div>
        );
    }
}