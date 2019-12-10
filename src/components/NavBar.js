import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="navBar-container">
                    <Button color="inherit" component={Link} to='/'>Home</Button>
                    <Button color="inherit" component={Link} to='/loginPage'>Login</Button>
                    <Button color="inherit" component={Link} to='/signupPage'>signup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar
