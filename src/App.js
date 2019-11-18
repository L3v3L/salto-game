import React from 'react';
import './App.css';
import Game from './components/Game';
import { GlobalHotKeys } from 'react-hotkeys';

const keyMap = {
  spaceKey: 'space'
};

function App() {
  return (
    <GlobalHotKeys keyMap={keyMap}>
      <div className='salto__wrapper'>
        <Game />
      </div>
    </GlobalHotKeys>
  );
}

export default App;
