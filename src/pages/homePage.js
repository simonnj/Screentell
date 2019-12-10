import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios'

export class homePage extends Component {
    state = {
        users: [
            {
                id: 1,
                bio: 'Artist doing freelancing, love to travel ect.',
                nickName: 'Julia'
            },
            {
                id: 2,
                bio: 'Local Politician, proud to serve my community',
                nickName: 'Morten'
            },
            {
                id: 3,
                bio: 'Another stressful day trying to fix an app',
                nickName: 'Nynne'
            }
        ]
    }
    state = {
        tells: [
            {
                id: 1,
                body: 'Took out the dog for a nice walk this morning :D',
                nickName: 'Kasper'
            },
            {
                id: 2,
                body: 'Dinner tonight at Noma, hype is real!',
                nickName: 'Morten'
            },
            {
                id: 3,
                body: 'Another stressful day trying to fix an app',
                nickName: 'Nynne'
            }
        ]
    }
    componentDidMount() {
        axios('./tells').then(res => {
            console.log(res.data);
            this.setState({
                tells: res.data
            })
        }).catch(err => console.log(err))
    }
    render() {
        // let recentTellsMockup = this.state.tells ? (
        //     this.state.tells.map(tell => <p>{tell.body}</p>)
        // ) : (
        //         <p>something</p>
        // )
        return (
            <Grid container spacing={2}>
                <Grid item sm={10} xs={12}>
                    <p>Tells    </p>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <div> User List
                    {/* {this.state.users.map((users) => (
                        <p>{users.nickName}</p>
                    ))} */}
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default homePage
