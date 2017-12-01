import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBarComponent from "./layouts/NavBarComponent";

import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Registration from "./auth/Registration";

import CategorySideBar from "./categories/CategorySideBar";
import Categories from "./categories/Categories";

import Post from "./posts/Post";
import {
    BrowserRouter as Router,
    Route,
    Link,
    HashRouter,
    Redirect
} from 'react-router-dom';
import axios from "axios";
import { Button } from 'reactstrap';

class Main extends Component {

    constructor(props){ 
        super(props);
        
        let isLogged = localStorage.getItem('isLogged');

        if (isLogged == 1) {
          isLogged = true;
        }else{
          isLogged = false;
        }

        this.state = {
            loggedIn: isLogged,
            isAddCategory: false
        };

        this.onHandleLogin = this.onHandleLogin.bind(this);
        this.onHandleLogout = this.onHandleLogout.bind(this);
        this.onHandleAddCategory = this.onHandleAddCategory.bind(this);
    }


    onHandleLogin(isLogged){
        this.setState({loggedIn: isLogged});
        console.log("on Handle is Logged");
    }

    onHandleLogout(){
      this.setState({loggedIn: false});
      console.log("on Handle is Logout");
    }

    onHandleAddCategory(){
      this.setState({
        isAddCategory: !this.state.isAddCategory
      });
    }

    render() {
        return (
            <HashRouter basename='/'>
                <div>
                  <NavBarComponent isLogged={this.state.loggedIn}/>
                  <hr/>
                  <CategorySideBar onAddNewCategory={this.state.isAddCategory}/>

                  <Route exact path="/post" component={Post}/>

                  <Route path="/login" render={() => <Login onLogin={this.onHandleLogin} />}/>
                  <Route path="/registration" component={Registration}/>
                  <Route path="/logout" render={() => <Logout onLogout={this.onHandleLogout} />}/>

                  <Route path='/categories' render={
                   () => <Categories url='/categories' onAddCategory={this.onHandleAddCategory} /> 
                  } />

                </div>
            </HashRouter>

        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}