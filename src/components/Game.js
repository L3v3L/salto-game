import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CardLibrary from './CardLibrary';
import { MonsterLibrary } from './MonsterLibrary';
import Battle from './Battle';
import MainScreen from './MainScreen';
import LoseScreen from './LoseScreen';

import { getAllState } from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
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

class Game extends Component {
  constructor(props) {
    super(props);

    // initialize player starter deck
    CardLibrary.map((item) => props.createCard(item));

    // initialize monsters
    MonsterLibrary.map((item) => props.createMonster(item));

    const starterDeck = [
      { id: 2, quantity: 5 },
      { id: 3, quantity: 5 },
    ];

    starterDeck.map((item) => {
      for (let i = 0; i < item.quantity; i++) {
        props.addCardToDeck(item.id);
      }
      return null;
    });
  }

  static getCurrentScreen(gameState) {
    switch (gameState) {
    case 'battle':
      return <Battle />;
    case 'reward':
      return <RewardScreen />;
    case 'lose':
      return <LoseScreen />;
    default:
      return <MainScreen />;
    }
  }

  render() {
    return (
      <MainWrapper>
        { Game.getCurrentScreen(this.props.allState.gameState) }
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const allState = getAllState(state);
  return { allState };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actionCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
