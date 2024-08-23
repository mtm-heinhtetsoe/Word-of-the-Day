import React, { useEffect } from 'react';
import './App.css';
import WOTD from './components/organisms/WOTD';

function App() {
  const word = "aeroplane".toUpperCase();
  const tryCount = 6;

  useEffect(() => localStorage.clear(), [])

  return (
    <div className="App">
      <header className="App-header">
        <p style={header}>
          Word of the Day
        </p>
        <WOTD tryCount={tryCount} word={word} />
      </header>
    </div>
  );
}

const header : React.CSSProperties = {
  fontSize: 48,
  fontWeight: 800,
  color: "rgb(240, 185, 11)",
}

export default App;
