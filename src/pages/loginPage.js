import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Icon from '../Images/AppIcon.png'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';



export class loginPage extends Component {
    
    render() {
        
        return (
            <Grid container className='login-container'>
                <Grid item sm />
                <Grid item sm>
                    <img src={Icon} alt="ScreenIcon" height="80" width="80"/>
                    <h2>Login</h2>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" type="email" label="Email" fullWidth></TextField>
                        <TextField id="password" type="password" label="Password" fullWidth></TextField>
                        <Button type="submit" variant="contained" color="primary" className="login-button" component={Link} to='/'>Login</Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

export default loginPage
