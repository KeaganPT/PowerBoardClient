import React from 'react'
import Auth from '../Auth/Auth'
import Powers from '../Powers/Powers'
import Characters from '../Characters/Characters'
import Profile from '../Profile/Profile'
import { Route, Link, Switch } from 'react-router-dom'
import './Navbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

type propTypes = {
    updateToken(newToken: String): void,
    token: string | null,
    user: string | null,
    setUser(user: String): void
}

const styles = {
    root: {
        width: '100%',
        backgroundColor: "#C5C3C3",
        color: '#333333', 
    },

    title: {
        flexGrow: 1,
        color: "333333",
        display: "center",
        font: 'bold'
    }    
}


class Sitebar extends React.Component<propTypes, {}> {

    render() {

        return (
            <div >
                <div className="sitebar-list" style={styles.root}>
                    <AppBar position="static" style={styles.root}>
                        <Toolbar>
                            <Button><Link className="link" to="/power-list">Powers</Link></Button>
                            <Button><Link className="link" to="/character-list">Characters</Link></Button>
                            
                            <Typography className="title" variant="h6" style={styles.title}>
                                The PowerBoard
                            </Typography>
                            <Button><Link className="link" to="/profile">Profile</Link></Button>
                            <Button style={{borderLeft: "5px", borderColor: "red"}}><Link className="link" to="/">SignUp/Login</Link></Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="sitebar-route">
                    <Switch>
                        <Route exact path="/home"></Route>
                        <Route exact path="/"><Auth updateToken={this.props.updateToken} setUser={this.props.setUser} /></Route> 
                        <Route exact path="/power-list"><Powers token={this.props.token} userRole={this.props.user}/></Route>
                        <Route exact path="/character-list"><Characters token={this.props.token} user={this.props.user}/></Route>
                        <Route exact path="/profile"><Profile token={this.props.token}/></Route>
                    </Switch>
                    
                </div>
            </div>
        )
    }
}

export default Sitebar;