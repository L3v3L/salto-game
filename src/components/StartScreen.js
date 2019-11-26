import React, { Component } from 'react';
import styled from 'styled-components';

const StartButton = styled.button`
  all: unset;
  border: 2px solid white;
  padding: 1rem 2rem;

  &:hover {
    cursor: pointer;
  }
`;

class StartScreen extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <StartButton onClick={ () => console.log('start button') }>
        Start
      </StartButton>
    );
  }
}

export default StartScreen;
