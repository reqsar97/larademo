import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";

export default class Post extends Component {
	constructor(props) {
		super(props)
	}

	// methods
	render(){

		let deleteUpdateElements;

		if (this.props.userPost) {
			deleteUpdateElements = (
				<div>
					<Link to={`/posts/userPosts/deletePost/${this.props.id}`}>
						<img src='/img/iconsDelete.png' width='25'/>
					</Link>
					<Link to={`/posts/userPosts/updatePost/${this.props.id}`}>
	                	<img src='/img/iconsEdit.png' width='25'/>
	                </Link>
				</div>
			);
		}

		let titleElement;
		if(this.props.singlePost){
			titleElement = this.props.title
		}else{
			titleElement = (
				<Link to={`/${this.props.url}/${this.props.parrentUrl}/${this.props.id}`} >
					{this.props.title}
                </Link>
			);
		}

		let date = new Date(this.props.createdAt);
		date = date.toLocaleString();
		return (
			<div className="blog-post">
                <h2 className="blog-post-title">
                    {titleElement}
              		{
              			deleteUpdateElements
              		}      

                </h2>
                <h4 className="blog-post-meta">
                    {this.props.author} on { date }
                </h4>
                <h5 className="blog-post-meta">
                    {this.props.category}
                </h5>
                <img src={`/img/${this.props.img}`} width="400" height="300" />
                <p className="text-left" style={{"width": "65%"}}>{this.props.body}</p>
            </div>
		);
	}
}