import React, { Component } from 'react';
import axios from "axios";
import {
    Redirect
} from 'react-router-dom'


export default class Logout extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        localStorage.setItem('isLogged', 0);
        console.log("Logout");
        axios.post('/api/logout', {
            token: localStorage.getItem('token')
          })
          .then( (response) => {
            console.log(response.data);
            localStorage.clear();
            localStorage.setItem('isLogged', 0);
            this.props.onLogout();
          })
          .catch(  (error) => {
            let status = error.response.status;
            if (status==422) {
                localStorage.clear();
                localStorage.setItem('isLogged', 0);
                this.props.onLogout();
            }
          });
    }
    render(){
        return <Redirect to='/'/>
    }
}
