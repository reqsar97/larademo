import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class CreatePost extends Component {
    constructor(props) {
        // code
        super(props);

        let errors = {
            title: [],
            body: [],
            image: [],
        }

        this.state = {
            title: '',
            body: '',
            image: '',
            category: '',
            createPostSuccess: false,
            categories: [],
            errors: errors,
            hasError: false,
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onHandleChangeTitle = this.onHandleChangeTitle.bind(this);
        this.onHandleChangeCategory = this.onHandleChangeCategory.bind(this);
        this.onHandleChangeBody = this.onHandleChangeBody.bind(this);
        this.onHandleClickSubmit = this.onHandleClickSubmit.bind(this);

        this.getAllCategories();
    }

    getAllCategories(){
        axios.get('/api/categories')
            .then( (response) => {

            let data = response.data.resource;
            this.setState( {
                categories: data.categories,
            });
            }).catch(function (error) {
                console.log(error);
            });
    }

    onFileChange(e){
        let files = e.target.files || e.dataTransfer.files;
        this.setState({ image: files[0] });
    }

    onHandleChangeTitle(e){
        let title = e.target.value;
        this.setState({ title:title });
    }

    onHandleChangeBody(e){
        let body = e.target.value;
        this.setState({ body:body });
    }

    onHandleChangeCategory(e){
        let category = e.target.value;
        this.setState({ category: category });
    }

    onHandleClickSubmit(e){
        e.preventDefault();
        let data = new FormData();
        data.append('title', this.state.title);
        data.append('body', this.state.body);
        data.append('category_id', this.state.category);
        data.append('image', this.state.image);
        data.append('token', localStorage.getItem('token'));

        axios.post('/api/posts', data)
            .then( (response) => {
                this.setState({createPostSuccess: true});
            }).catch( (error) => {
                console.log(error);
                var errors = error.response.data;
                this.setState({errors: errors});
            });

    }

    render(){

        let option = <option value="id">Category NAme</option>
        if(this.state.categories){
            option = this.state.categories.map((value)=>{
                return <option value={value.id} key={value.id}>{value.name}</option>
            })
        }
        let redirect = this.state.createPostSuccess && <Redirect to="/posts/userPosts" />

        return (
            <div className="col-md-8 col-md-offset-2.5">
                <h3>Create post</h3>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form method="POST" action="#" encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    value={this.state.title}
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    required
                                    onChange={this.onHandleChangeTitle}
                                    />
                                <span className="help-block">
                                    <strong>{ this.state.errors.title[0] }</strong>
                                </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="body">Text:</label>
                                <textarea
                                    id="body"
                                    value={this.state.body}
                                    name="body"
                                    className="form-control"
                                    onChange={this.onHandleChangeBody}
                                    />
                                <span className="help-block">
                                    <strong>{ this.state.errors.body[0] }</strong>
                                </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category:</label>
                                <select
                                    name="category_id"
                                    value={this.state.value}
                                    onChange={this.onHandleChangeCategory}
                                    >
                                    {option}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Upload image:</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={this.onFileChange}
                                    />
                                <span className="help-block">
                                    <strong>{ this.state.errors.image[0] }</strong>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.onHandleClickSubmit}>
                                Create
                            </button>
                        </form>
                    </div>
                </div>
                {redirect}
            </div>
        );
    }
}
