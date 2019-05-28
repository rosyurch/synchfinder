import React from 'react';
import logo from './logo.svg';
import './App.css';
import AllTourn from './AllTourn';
import './Tour.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Турниры ЧГК</h3>
      </header>
      <AllTourn />
    </div>
  );
}

export default App;
