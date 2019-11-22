import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardLibrary } from './CardLibrary';
import { MonsterLibrary } from './MonsterLibrary';
import Battle from './Battle';

import { getAllState } from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';

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
      <div>
        {this.props.allState.gameState}
        {this.props.allState.gameState === 'battle' ? <Battle /> : ''}
      </div>
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
