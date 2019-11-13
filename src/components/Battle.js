import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import Card from "./Card";
import Monster from "./Monster";

import * as selectors from "../ducks/selectors";
import * as actionCreators from "../ducks/actionCreators";

import styled from "styled-components";

const Centered = styled.div`
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

    let amountCardsStarting = 5;
    for (let i = 0; i < amountCardsStarting; i++) {
      handDeck.push(battleDeck.pop());
    }

    props.setBattleMaxAP(props.allState.player.maxAP);
    props.setBattleCurrentAP(props.allState.player.maxAP);

    props.setBattleDeck({ deckArray: battleDeck, targetDeck: "deck" });
    props.setBattleDeck({ deckArray: handDeck, targetDeck: "hand" });

    props.addMonster(1);
    props.addMonster(0);
    this.dispatchQueuedActions = this.dispatchQueuedActions.bind(this);
  }

  render() {
    return (
      <div>
        <Centered>
          {this.props.allState.battle.monsters
            .map(monster => {
              return {
                ref: this.props.monsters.find(
                  monsterLib => monsterLib.id === monster.id
                ),
                monster: monster
              };
            })
            .map(monster => {
              return (
                <Monster
                  key={monster.monster.uuid}
                  uuid={monster.monster.uuid}
                  id={monster.monster.id}
                  hp={monster.monster.hp}
                  maxHp={monster.ref.hp}
                  dispatchQueuedActions={this.dispatchQueuedActions}
                />
              );
            })}
        </Centered>

        <Centered
          style={
            this.props.isSelectingTarget
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          Select Target
        </Centered>

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
          {this.props.allState.battle.currentAP}/
          {this.props.allState.battle.maxAP}
          <br />
        </BattleStats>
        <br />
        <Hand>
          {this.props.allState.battle.hand
            .map(handCard => {
              return {
                ref: this.props.cards.find(card => card.id === handCard.id),
                card: handCard
              };
            })
            .map(cardInHand => {
              return (
                <Card
                  label={cardInHand.ref.name}
                  key={cardInHand.card.uuid}
                  uuid={cardInHand.card.uuid}
                  cost={cardInHand.ref.cost}
                  actions={cardInHand.ref.actions}
                  description={cardInHand.ref.description}
                  dispatchQueuedActions={this.dispatchQueuedActions}
                />
              );
            })}
        </Hand>
        <button onClick={() => this.props.addToBattleTurn(1)}>End Turn</button>
      </div>
    );
  }

  dispatchQueuedActions() {
    this.props.allState.battle.queuedActions.map(action =>
      this.props.dispatch(action)
    );
  }
}

const mapStateToProps = state => {
  const allState = selectors.getAllState(state);
  const cards = selectors.getCards(state);
  const monsters = selectors.getMonsters(state);
  const isSelectingTarget = selectors.getIsSelectingTarget(state);

  return { allState, monsters, cards, isSelectingTarget };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...actionCreators }, dispatch),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
