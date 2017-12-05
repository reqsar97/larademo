import React, { Component } from 'react';
import axios from "axios";
import {
    Link
} from 'react-router-dom'

export default class CategorySideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddCategory: false,
            ajaxDone: false,
            categories: [],
            postsCount: '',
            usersCount: ''
        }
    }



    componentWillReceiveProps(nextProps){
        if(this.props.onAddNewCategory != nextProps.onAddCategory){
            this.getAllCategories();
        }
    }

    getAllCategories(){
        axios.get('/api/allCategories')
            .then( (response) => {

            let data = response.data;
            this.setState( {
                ajaxDone: true,
                categories: data.categories,
                postsCount: data.postCount,
                usersCount: data.userCount
            } );

          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount(){
        this.getAllCategories();
    }
    
    // methods
    render(){
        var categoriesElement = [];

        if(this.state.ajaxDone){
            categoriesElement = this.state.categories.map(function(value){
                let li = (
                    <Link to={`/posts/category/${value.id}`} key={value.id} replace>
                        <li>{value.name}</li>
                    </Link>
                    );
                return li;
            });
        }
        return (
            <div className="col-sm-3 offset-sm-1">
                <div className="sidebar-module top-left">
                    <ol className="list-unstyled">
                        <li>Count of Categories: {categoriesElement.length}</li>
                        <li>Count of Posts: {this.state.postsCount}</li>
                        <li>Count of Users: {this.state.usersCount}</li>
                    </ol>
                    <h4>Categories</h4>
                    <ol className="list-unstyled">
                            {categoriesElement}
                    </ol>
                </div>
            </div>

        );
    }
}