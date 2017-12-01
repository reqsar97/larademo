import React, { Component } from 'react';
import NavBarUserMenu  from "./NavBarUserMenu";
import NavBarGuestMenu  from "./NavBarGuestMenu";

class NavBarComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){

        var menu = this.props.isLogged === true ? <NavBarUserMenu />:<NavBarGuestMenu />;

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

                        <a className="navbar-brand" href="#">
                            Blog
                        </a>
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