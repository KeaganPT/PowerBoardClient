import React from 'react';
import './App.css';
import Sitebar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Sitebar />
      </Router>
    </div>
  );
}

export default App;
