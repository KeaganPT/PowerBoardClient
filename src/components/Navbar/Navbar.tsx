import React from 'react'
import Auth from '../Auth/Auth'
import { Route, Link, Switch } from 'react-router-dom'

type propTypes = {
    updateToken(newToken: String): void
}



class Sitebar extends React.Component<propTypes, {}> {


    render() {
        return (
            <div className="sitebar">
                <div className="sitebar-list list-unstyled">
                    <ul className="sidebar-list list-unstyled" style={{ listStyleType: 'none'}}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/auth">SignUp/Login</Link></li>
                    </ul>
                </div>
                <div className="sitebar-route">
                    <Switch>
                        <Route exact path="/home"></Route>
                        <Route exact path="/auth"><Auth updateToken={this.props.updateToken} /></Route> 
                    </Switch>
                    
                </div>
            </div>
        )
    }
}

export default Sitebar;