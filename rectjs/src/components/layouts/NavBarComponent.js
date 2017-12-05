import React, { Component } from 'react';
import NavBarUserMenu  from "./NavBarUserMenu";
import NavBarGuestMenu  from "./NavBarGuestMenu";
import { Link} from 'react-router-dom';

class NavBarComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){

        var menu = this.props.isLogged ? <NavBarUserMenu />:<NavBarGuestMenu />;

        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">


                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to='/posts' className="navbar-brand">
                            Blog React
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="app-navbar-collapse">

                        <ul className="nav navbar-nav">
                            &nbsp;
                        </ul>


                        <ul className="nav navbar-nav navbar-right">
                            {menu}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}

export default NavBarComponent;