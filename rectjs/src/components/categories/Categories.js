import React, { Component } from 'react';
import UserCategories from "./UserCategories";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import {
    Link,
    Route
} from 'react-router-dom'

export default class Categories extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let url = this.props.url;
        return (
            <div>
                <Route exact path={url} render={() => (
                    <div>
                        <h3>My Categories</h3>
                        <Link to={`${url}/createCategory`}>
                            <h4>Create category</h4>
                        </Link>
                        <UserCategories onAddCategory={this.props.onAddCategory}/>
                    </div>
                )}/>
                <Route path={`${url}/createCategory`} render={
                    () => <AddCategory onAddCategory={this.props.onAddCategory}/>
                }/>
                <Route path={`${url}/updateCategory/:categoryId`} render={
                    (props) => <UpdateCategory {...props} onAddCategory={this.props.onAddCategory}/>
                }/>
            </div>
        );
    }
}