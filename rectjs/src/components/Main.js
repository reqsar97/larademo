import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavBarComponent from "./layouts/NavBarComponent";

import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Registration from "./auth/Registration";

import CategorySideBar from "./categories/CategorySideBar";
import Categories from "./categories/Categories";

import PostsRoutController from "./posts/PostsRoutController";

import {
    Route,
    Link,
    HashRouter,
    Redirect
} from 'react-router-dom';
import axios from "axios";

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
    }

    onHandleLogout(){
      this.setState({loggedIn: false});
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

                  <Route path="/posts" component={PostsRoutController} />

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