import React, { Component } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

export default class UpdatePost extends Component {
    constructor(props) {
        // code
        super(props)
        let id = this.props.match.params.id;
        this.state = {
            id: id,
            title:'',
            body:'',
            updatePostSucces: false,
            errors: []
        }

        this.onHandleChangeTitle = this.onHandleChangeTitle.bind(this);
        this.onHandleChangeBody = this.onHandleChangeBody.bind(this);
        this.onHandleClickSubmit = this.onHandleClickSubmit.bind(this);
    }

    onHandleChangeTitle(e){
        let title = e.target.value;
        this.setState({ title:title });
    }

    onHandleChangeBody(e){
        let body = e.target.value;
        this.setState({ body:body });
    }

    onHandleClickSubmit(e){
        e.preventDefault();
        axios.post(`/api/post/update/${this.state.id}`, {
            token: localStorage.getItem('token'),
            title: this.state.title,
            body: this.state.body,
        })
            .then( (response) => {
                console.log(response);
                this.setState({createPostSuccess: true})
            }).catch( (error) => {
                var errors = error.response.data.errors;
                this.setState({errors: errors});
            });

    }

    render(){

        let redirect = this.state.createPostSuccess && 
                <Redirect 
                  push 
                  to={`/posts/userPosts/post/${this.state.id}`} 
                  />;

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2.5">
                    <div className="panel panel-default">
                        <div className="panel-body">

                            <table className="table table-striped task-table">
                                <thead>
                                <tr>
                                    <td>
                                        <h3>Update post</h3>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <form method="POST" action="#" className="form-group">
                                                <div className="form-group">
                                                    <label htmlFor="name">Title:</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="title" 
                                                        name="title" 
                                                        required 
                                                        onChange={this.onHandleChangeTitle}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="name">Text:</label>
                                                    <textarea 
                                                        id="body" 
                                                        name="body" 
                                                        className="form-control" 
                                                        onChange={this.onHandleChangeBody} 
                                                        />
                                                </div>

                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary" 
                                                    onClick={this.onHandleClickSubmit}>
                                                  Update
                                                </button>
                                            </form>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
                {redirect}
            </div>
        );
    }
}