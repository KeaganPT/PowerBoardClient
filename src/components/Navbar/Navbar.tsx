import React from 'react'
import Auth from '../Auth/Auth'
import Powers from '../Powers/Powers'
import Characters from '../Characters/Characters'
import Profile from '../Profile/Profile'
import { Route, Link, Switch } from 'react-router-dom'

type propTypes = {
    updateToken(newToken: String): void,
    token: string
}



class Sitebar extends React.Component<propTypes, {}> {


    render() {
        return (
            <div className="sitebar">
                <div className="sitebar-list list-unstyled">
                    <ul className="sidebar-list list-unstyled" style={{ listStyleType: 'none'}}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/auth">SignUp/Login</Link></li>
                        <li><Link to="/power-list">Powers</Link></li>
                        <li><Link to="/character-list">Characters</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                </div>
                <div className="sitebar-route">
                    <Switch>
                        <Route exact path="/home"></Route>
                        <Route exact path="/auth"><Auth updateToken={this.props.updateToken} /></Route> 
                        <Route exact path="/power-list"><Powers token={this.props.token}/></Route>
                        <Route exact path="/character-list"><Characters token={this.props.token} /></Route>
                        <Route exact path="/profile"><Profile token={this.props.token}/></Route>
                    </Switch>
                    
                </div>
            </div>
        )
    }
}

export default Sitebar;