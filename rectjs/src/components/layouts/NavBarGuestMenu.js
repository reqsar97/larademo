import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class NavBarGuestMenu extends Component {

    render(){
        return [

            <li key="login"><Link to="/login" replace> Login</Link></li>,
            <li key="registration"><Link to="/registration" replace>Registration</Link></li>
        ];
    }
}