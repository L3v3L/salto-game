import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import Card from "./Card";
import Monster from "./Monster";

import * as battle from '../ducks/battle';
import * as cards from '../ducks/cards';
import * as monsters from '../ducks/monsters';
import * as player from '../ducks/player';

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

    props.addMonster(30);
    props.addMonster(30);

    // Example: Creating 20 cards and adding them all to the player's deck
    for (let index = 1; index <= 20; index++) {
      if (index <= 5) {
        props.createCard(index, `Attack`, 2, "attacks %value", 3);
        props.addCardToDeck(index);
      } else {
        props.createCard(index, `Block`, 3, "blocks %value", 1);
        props.addCardToDeck(index);
      }
    }

    // Example: Adding 4 card from deck to player's hand
    props.removeCardFromDeck(1);
    props.addCardToHand(1);

    props.removeCardFromDeck(2);
    props.addCardToHand(2);

    props.removeCardFromDeck(6);
    props.addCardToHand(6);

    props.removeCardFromDeck(7);
    props.addCardToHand(7);

    // Example: Discarding a card
    let cardId = 8;
    props.removeCardFromDeck(cardId);
    props.addCardToHand(cardId);
    props.removeCardFromHand(cardId);
    props.addCardToDiscard(cardId);

    this.state = {};
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
          {this.props.monstersState.map(monster => {
            return <Monster key={monster.id} hp={monster.hp} />;
          })}
        </MonsterWrapper>
        <br />
        <BattleStats>
          Player HP:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.playerState.hp}
          <br />
          Deck Size:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.cardsState.length}
          <br />
          Cards in Hand:&nbsp;&nbsp;{this.props.playerState.hand.length}
          <br />
          Discard Pile:&nbsp;&nbsp;&nbsp;{this.props.playerState.discard.length}
          <br />
          Actions:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.playerState.remainingActions}/{this.props.playerState.maxActions}
          <br />
        </BattleStats>
        <br />
        <Hand>
          { this.props.playerState.hand
            .map(id => this.props.cardsState.find(card => card.id === id))
            .map(cardInHand => {
              switch(cardInHand.id) {
                case 1:
                case 2:
                  return <Card label={cardInHand.name}
                      value={cardInHand.power}
                      key={cardInHand.id}
                      uniqueId={cardInHand.id}
                      cost={cardInHand.cost}
                      actions={
                        [
                          monsters.attackMonster(1, cardInHand.power),
                          monsters.attackMonster(2, cardInHand.power)
                        ]
                      }
                      description={cardInHand.description} />
                case 3:
                case 4:
                default:
                  return <Card label={cardInHand.name}
                      value={cardInHand.power}
                      key={cardInHand.id}
                      uniqueId={cardInHand.id}
                      cost={cardInHand.cost}
                      description={cardInHand.description} />
              }
            })
          }
        </Hand>
        {/* <button onClick={() => this.endTurn()}>End Turn</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const playerState = player.getPlayerState(state);
  const monstersState = monsters.getMonsters(state);
  const cardsState = cards.getCards(state);
  const remainingActions = player.getPlayerActions(state);
  return { playerState, cardsState, monstersState, remainingActions };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...player, ...monsters, ...cards, ...battle }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
