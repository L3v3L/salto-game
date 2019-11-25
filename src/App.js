import React from 'react';
import './App.css';
import { GlobalHotKeys } from 'react-hotkeys';
import Game from './components/Game';

const keyMap = {
  spaceKey: 'space',
};

function App() {
  return (
    <GlobalHotKeys keyMap={ keyMap }>
      <Game />
    </GlobalHotKeys>
  );
}

export default App;
