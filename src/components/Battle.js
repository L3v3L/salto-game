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

    props.setBattleHP(props.allState.player.hp);
    props.setBattleMaxAP(props.allState.player.maxAP);
    props.setBattleCurrentAP(props.allState.player.maxAP);

    props.setBattleDeck(battleDeck);
    props.setHandDeck(handDeck);

    props.addMonster(1);
    props.addMonster(0);
    this.dispatchQueuedActions = this.dispatchQueuedActions.bind(this);
  }

  endTurn() {
    const maxCardsToDraw = 5;

    let newDiscardArray = this.props.allState.battle.discard;
    let newHandArray = this.props.allState.battle.hand;
    let newdeckArray = this.props.allState.battle.deck;

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

    this.props.setBattleDeck(newdeckArray);
    this.props.setHandDeck(newHandArray);
    this.props.setDiscardDeck(newDiscardArray);

    this.props.setBattleCurrentAP(this.props.allState.battle.maxAP);

    //run monster queue attacks

    this.props.allState.battle.monsters.map(monster => {
      if (this.props.allState.battle.monsterMoves[monster.uuid]) {
        this.props.allState.battle.monsterMoves[monster.uuid].map(move => {
          switch (move.type) {
            case "attack":
              this.props.setBattleHP(
                this.props.allState.battle.hp - move.value
              );
              break;
            case "block":
              console.log("block " + move.value);
              break;
            default:
              break;
          }
          return null;
        });
      }
      return null;
    });

    this.props.resetMonsterMoves();

    this.props.allState.battle.monsters.map(monster => {
      let monsterRef = this.props.monsters.find(
        monsterLib => monsterLib.id === monster.id
      );
      this.props.setMonsterMoves(
        monster.uuid,
        monsterRef.moves[Math.floor(Math.random() * monsterRef.moves.length)]
      );
      return null;
    });
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
        <button onClick={() => this.endTurn()}>End Turn</button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Battle);
