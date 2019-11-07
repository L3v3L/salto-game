import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Card from "./Card";
import Monster from "./Monster";

import { getMonsters, getPlayerState, getCards } from "../redux/selectors";

import {
  addMonster,
  createCard,
  addCardToDeck,
  addCardToHand
} from "../redux/actions";

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

    props.dispatch(addMonster(50));
    props.dispatch(addMonster(30));

    // Create cards and add them all to the player's deck
    for (let index = 1; index <= 20; index++) {
      if (index <= 5) {
        props.dispatch(createCard(index, `Attack`, 2, "attacks %value", 3));
        props.dispatch(addCardToDeck(index));
      } else {
        props.dispatch(createCard(index, `Block`, 3, "blocks %value", 1));
        props.dispatch(addCardToDeck(index));
      }
    }

    // Add 4 cards to player's hand
    props.dispatch(addCardToHand(1));
    props.dispatch(addCardToHand(2));
    props.dispatch(addCardToHand(6));
    props.dispatch(addCardToHand(7));

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
      discardArray: newDiscardArray
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
          Player HP:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.player.hp}
          <br />
          Deck Size:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.cards.length}
          <br />
          Cards in Hand:&nbsp;&nbsp;{this.props.player.hand.length}
          <br />
          Discard Pile:&nbsp;&nbsp;&nbsp;{this.props.player.discard.length}
          <br />
          Actions:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.player.remainingActions}/{this.props.player.maxActions}
          <br />
        </BattleStats>
        <br />
        <Hand>
          {this.props.player.hand
            .map(id => this.props.cards.find(card => card.id === id))
            .map(cardInHand => {
              let card = new Card({
                label: cardInHand.name,
                value: cardInHand.power,
                key: cardInHand.id,
                cost: cardInHand.cost,
                description: cardInHand.description
              });

              return card.render();
            })}
        </Hand>
        {/* <button onClick={() => this.endTurn()}>End Turn</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const player = getPlayerState(state);
  const monsters = getMonsters(state);
  const cards = getCards(state);
  return { player, cards, monsters };
};

export default connect(mapStateToProps)(Battle);
