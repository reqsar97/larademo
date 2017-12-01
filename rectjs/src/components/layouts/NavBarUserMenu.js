import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class NavBarUserMenu extends Component {

	render(){
		let name = localStorage.getItem('name');
		return (
		      <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        {name}
                    </a>

                        <ul className="dropdown-menu" role="menu">
                            <li>
                                <Link to='/logout' >
                                    Logout
                                </Link>
                            </li>
                            <li>
                                <Link to='/categories' >
                                    My categories
                                </Link>
                            </li>
                            <li>
                                <a href="/posts/my">My Posts</a>
                            </li>
                        </ul>
              </li>        
        );
	}
}