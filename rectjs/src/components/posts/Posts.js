import React, { Component } from 'react';
import Post from "./Post";
import SinglePost from "./SinglePost";
import axios  from "axios";
import { Link } from "react-router-dom";

class Posts extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            ajaxDone: false
        }
    }

    componentDidMount(){
        axios.get('/api/posts')
          .then( (response) => {
            let data = response.data.resource.posts.data;
            this.setState({
                posts: data,
                ajaxDone: true
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        let url = this.props.url;
        let posts = [];
        console.log(`${url}/:id`);
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
                              url='posts'
                              singlePost={false}
                              parrentUrl="post"
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

export default Posts;
