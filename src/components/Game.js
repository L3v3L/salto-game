import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CardLibrary from './CardLibrary';
import { MonsterLibrary } from './MonsterLibrary';
import Battle from './screens/Battle';
import MainScreen from './screens/MainScreen';
import LoseScreen from './screens/LoseScreen';

import { getAllState } from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import RewardScreen from './screens/RewardScreen';

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
  }

  getCurrentScreen(gameState) {
    switch (gameState) {
    case 'reset':
      const starterDeck = [
        { id: 9, quantity: 5 },
        { id: 3, quantity: 5 },
      ];

      this.props.emptyPlayerDeck();

      starterDeck.map((item) => {
        for (let i = 0; i < item.quantity; i++) {
          this.props.addCardToDeck(item.id);
        }
        return null;
      });
      this.props.setGameState('battle');
      return null;
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
        { this.getCurrentScreen(this.props.allState.gameState) }
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
