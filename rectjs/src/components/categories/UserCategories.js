import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {
    Redirect,
    Link,
    Route
} from 'react-router-dom'

function Category(props) {
    // body...
    function onDelete(e){
        e.preventDefault();
        props.onHandleDelete(props.id);
    }
    return (
        <tr>
            <td className="table-text"><div>{props.name}</div></td>
            <td>
                <form action="#" method="POST">
                    <button type="submit" className="btn btn-primary" onClick={onDelete}>
                        <i className="fa fa-btn fa-trash"></i>DELETE
                    </button>
                </form>
            </td>
            <td>
                <Link to={`/categories/updateCategory/${props.id}`}>
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-btn fa-trash"></i>Update
                    </button>
                </Link>
            </td>
        </tr>
    );

}

export default class UserCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            ajaxDone: false,
            update: false
        }

        this.onHandleClickDelete = this.onHandleClickDelete.bind(this);
    }

    componentDidMount(){
        this.getUserCategories();
    }

    getUserCategories(){
        axios.get('/api/me/categories', {
            params: {
                token: localStorage.getItem('token')
            }
        }).then( (response) => {

            let data = response.data.categories;
            this.setState({
                categories: data,
                ajaxDone: true,
            });

          })
          .catch( (error) => {
            console.log(error);
          });
    }

    onHandleClickDelete(id){
        axios.delete(`/api/categories/${id}`,{
            params: {
                token: localStorage.getItem('token')
            }
        }).then( (response) => {
            this.getUserCategories();
            this.props.onAddCategory();
        }).catch( (error) => {
            console.log(error);
        });
    }

    render(){

        let categories = [];

        if(this.state.ajaxDone){
            categories = this.state.categories.map((value) => {
                return <Category 
                        name={value.name}
                        key={value.id}
                        id={value.id} 
                        onHandleDelete={this.onHandleClickDelete}
                       />
            })
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-offset-3">
                            <div >
                                <ol className="list-unstyled">
                                        <div className="panel-body">
                                            <table className="table table-striped task-table">
                                                <tbody>
                                                    {categories}
                                                </tbody>
                                            </table>
                                        </div>
                                </ol>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}