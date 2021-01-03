import React from 'react';
import './App.css';
import Sitebar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom"

type tokenTypes = {
  sessionToken: string
}

class App extends React.Component<{}, tokenTypes> {
  constructor(props: any){
    super(props)
    this.state = {
      sessionToken: ''
    }
    this.updateToken = this.updateToken.bind(this);
    
  }

  updateToken(newToken : string) {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken})
  }

  render(){
  return (
    <div className="App">
      <Router>
        <Sitebar updateToken={this.updateToken} token={this.state.sessionToken}/>
      </Router>
    </div>
  );
  }
}

export default App;
