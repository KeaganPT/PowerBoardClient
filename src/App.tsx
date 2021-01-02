import React from 'react';
import './App.css';
import Sitebar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom"


class App extends React.Component {
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
        <Sitebar updateToken={this.updateToken}/>
      </Router>
    </div>
  );
  }
}

export default App;
