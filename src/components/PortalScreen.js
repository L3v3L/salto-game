import React, { Component } from 'react';
import styled from 'styled-components';

const Portals = styled.div`
  flex-direction: row;

  & button {
    all: unset;
    height: 6rem;
    width: 6rem;
    border: 2px solid white;
    border-radius: 50%;
    padding: 2rem;
    margin: 1rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

class PortalScreen extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Portals>
        <button onClick={ () => console.log('Portal1') }>Portal 1</button>
        <button onClick={ () => console.log('Portal2') }>Portal 2</button>
        <button onClick={ () => console.log('Portal3') }>Portal 3</button>
      </Portals>
    );
  }
}

export default PortalScreen;
