import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import Card from "./Card";
import Monster from "./Monster";

import * as game from "../ducks/game";

import styled from "styled-components";

const MonsterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const Hand = styled.div`
  display: flex;
  & > div {
    margin: 2px;
  }
`;

const BattleStats = styled.div`
  font-family: monospace;
`;

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    let battleDeck = _.shuffle(props.allState.player.deck);
    let handDeck = [];

    let amountCardsStarting = 4;
    for (let i = 0; i < amountCardsStarting; i++) {
      handDeck.push(battleDeck.pop());
    }

    props.setBattleHP(props.allState.player.hp);

    props.setBattleDeck(battleDeck);
    props.setHandDeck(handDeck);

    props.addMonster(30);
    props.addMonster(30);
  }

  endTurn() {
    let newDiscardArray = this.state.discardArray;
    let newHandArray = this.state.handArray;
    let newdeckArray = this.state.deckArray;

    const maxCardsToDraw = 4;
    let amountCardsToDraw = Math.min(
      newDiscardArray.length + newdeckArray.length,
      maxCardsToDraw
    );

    newDiscardArray = newDiscardArray.concat(newHandArray);
    newHandArray = [];

    while (amountCardsToDraw) {
      if (!newdeckArray.length) {
        newdeckArray = newDiscardArray;
        newDiscardArray = [];
        newdeckArray = _.shuffle(newdeckArray);
      }
      newHandArray.push(newdeckArray.pop());
      amountCardsToDraw--;
    }

    this.setState(state => ({
      moves: state.maxMoves,
      handArray: newHandArray,
      deckArray: newdeckArray,
      discardArray: newDiscardArray,
      actionQueue: []
    }));
  }

  render() {
    return (
      <div>
        <MonsterWrapper>
          {this.props.monsters.map(monster => {
            return <Monster key={monster.id} hp={monster.hp} />;
          })}
        </MonsterWrapper>
        <br />
        <BattleStats>
          Player HP:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.allState.battle.hp}
          <br />
          Deck Size:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.allState.battle.deck.length}
          <br />
          Cards in Hand:&nbsp;&nbsp;{this.props.allState.battle.hand.length}
          <br />
          Discard Pile:&nbsp;&nbsp;&nbsp;
          {this.props.allState.battle.discard.length}
          <br />
          Actions:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.allState.battle.actions}/
          {this.props.allState.player.actions}
          <br />
        </BattleStats>
        <br />
        <Hand>
          {this.props.allState.battle.hand
            .map(id => this.props.cards.find(card => card.id === id))
            .map(cardInHand => {
              return (
                <Card
                  label={cardInHand.name}
                  key={cardInHand.id}
                  uniqueId={cardInHand.id}
                  cost={cardInHand.cost}
                  actions={cardInHand.actions}
                  description={cardInHand.description}
                />
              );
            })}
        </Hand>
        {/* <button onClick={() => this.endTurn()}>End Turn</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const allState = game.getAllState(state);
  const cards = game.getCards(state);
  const monsters = game.getMonsters(state);
  return { allState, monsters, cards };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...game }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Battle);
