import React from 'react'

import { Route, Link, Switch } from 'react-router-dom'

class Sitebar extends React.Component {
    render() {
        return (
            <div className="sitebar">
                <div className="sitebar-list list-unstyled">
                    <ul className="sidebar-list list-unstyled">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </div>
                <div className="sitebar-route">
                    <Switch>
                        <Route exact path="/home"></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Sitebar;