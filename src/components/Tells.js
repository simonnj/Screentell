import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        display: 'flex'
    }
}

export class Tells extends Component {
    
    render() {
        const { classes, tells: { body, createdAt, nickName } } = this.props;
        return (
            <Card>
                <CardContent>
                    <h5>testing</h5>
                    <Typography variant="h5">placeholder name</Typography>
                    <Typography variant="h5">createdAt: xx:xx:xxxx</Typography>
                    <Typography variant="h5">testing this card thing</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Tells);
