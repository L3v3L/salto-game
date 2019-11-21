import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardLibrary } from './CardLibrary';
import { MonsterLibrary } from './MonsterLibrary';
import Battle from './Battle';

import { getAllState } from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.7em;
  margin:0;
  padding:0;
  min-width: 900px
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  overflow: hidden;
`;

const GameStateIndicator = styled.span`
  position: fixed;
  left:0;
  top:0;
  z-index: 999;
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
      { id: 1, quantity: 5 },
      { id: 2, quantity: 5 },
      { id: 3, quantity: 5 },
      { id: 4, quantity: 5 },
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
