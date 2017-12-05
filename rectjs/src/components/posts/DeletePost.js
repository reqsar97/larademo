import React, { Component } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

export default class DeletePost extends Component {
    constructor(props) {
        // code
        super(props);
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        axios.post(`/api/post/delete/${id}`,{
            token: localStorage.getItem('token')
        }).then( (response) => {
            console.log(response);
        }).catch( (error) => {
            console.log(error);
        });
    }

    // methods
    render(){

        return (
            <div>
                <Redirect to='/posts/userPosts' />
            </div>
        );
    }
}