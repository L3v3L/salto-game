import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardLibrary } from './CardLibrary';
import { MonsterLibrary } from './MonsterLibrary';
import Battle from './Battle';

import { getAllState } from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import styled from 'styled-components';
import RewardScreen from './RewardScreen';

const MainWrapper = styled.div`
  background-color: #27d9d0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.7em;
  margin: 0;
  padding: 0;
  min-width: 900px;
  height: 100vh;
  min-height: 770px;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
`;

const GameStateIndicator = styled.span`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
`;

export class Game extends Component {
  constructor(props) {
    super(props);

    //initialize player starter deck
    CardLibrary.map(function(item) {
      return props.createCard(item);
    });

    //initialize monsters
    MonsterLibrary.map(function(item) {
      return props.createMonster(item);
    });

    let starterDeck = [
      { id: 2, quantity: 5 },
      { id: 3, quantity: 5 },
      { id: 8, quantity: 5 },
      { id: 9, quantity: 5 },
      { id: 14, quantity: 5 },
      { id: 21, quantity: 5 },
      { id: 37, quantity: 5 },
      { id: 39, quantity: 5 },
      { id: 52, quantity: 5 },
      { id: 58, quantity: 5 }
    ];

    starterDeck.map(function(item) {
      for (let i = 0; i < item.quantity; i++) {
        props.addCardToDeck(item.id);
      }
      return null;
    });
  }

  render() {
    return (
      <MainWrapper>
        <GameStateIndicator>{this.props.allState.gameState}</GameStateIndicator>
        {this.props.allState.gameState === 'battle' ? <Battle /> : ''}
        {this.props.allState.gameState === 'reward' ? <RewardScreen /> : ''}
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => {
  const allState = getAllState(state);
  return { allState };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actionCreators }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
