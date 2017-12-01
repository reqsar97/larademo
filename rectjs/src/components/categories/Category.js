import React, { Component } from 'react';
import axios from "axios";
import {
    Redirect,
    Link
} from 'react-router-dom'

export default class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ajaxDone: false
		}
		this.categories = '';
		this.counts = {
			posts: '',
			users: ''
		}
	}

	componentDidMount(){
		let self = this;
		axios.get('/api/allCategories')
			.then(function (response) {
		    // console.log(response);
		    let data = response.data;
		    self.categories = data.categories;
		    self.counts.posts = data.postCount;
		    self.counts.users = data.userCount;
		    self.setState( {ajaxDone: true} );
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
	
	// methods
	render(){

		var categoriesElement = [];

		if(this.state.ajaxDone){
			this.categories.map(function(value){
				let li = (
					<a href='#' key={value.name}>
						<li>{value.name}</li>
					</a>
					);
				categoriesElement.push(li);
			});
		}
		return (
			<div className="col-sm-3 offset-sm-1">
			    <div className="sidebar-module top-left">
			        <ol className="list-unstyled">
			            <li>Count of Categories: {categoriesElement.length}</li>
			            <li>Count of Posts: {this.counts.posts}</li>
			            <li>Count of Users: {this.counts.users}</li>
			        </ol>
			        <h4>Categories</h4>
			        <ol className="list-unstyled">
			                <li>
			                    
			                </li>
			                {categoriesElement}
			        </ol>
			    </div>
			</div>

		);
	}
}