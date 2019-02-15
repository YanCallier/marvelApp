import React, { Component } from 'react';
import './App.css';
import MarvelList from './MarvelList/MarvelList';


class App extends Component {
  render() {
    
    return (
      <div role="main" className="main">
        <div className= "inner cover">
          <MarvelList/>
        </div>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
              React App by <a href="https://www.ycallier.fr" target="_blank" rel="noopener noreferrer">Yan Callier</a> Data provided by <a href="https://www.marvel.com/" target="_blank" rel="noopener noreferrer">Marvel</a>. © 2017 MARVEL.
            </p>
          </div>
        </footer>
    </div>
    );
  }
}

export default App;
