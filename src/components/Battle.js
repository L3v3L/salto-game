import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Card from './Card';
import Monster from './Monster';

import * as selectors from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';

import styled from 'styled-components';

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

    let battleCards = _.cloneDeep(_.shuffle(props.allState.player.deck));
    battleCards = battleCards.map(card => {
      card.deck = 'deck';
      return card;
    });

    let amountCardsStarting = 5;

    for (let i = 0; i < amountCardsStarting; i++) {
      battleCards[i].deck = 'hand';
    }

    props.setBattleCards({ cards: battleCards });

    props.setBattleMaxAP(props.allState.player.maxAP);
    props.setBattleCurrentAP(props.allState.player.maxAP);

    props.addMonster(1);
    props.addMonster(0);
  }

  render() {
    return (
      <div>
        <Centered>
          {this.props.monsters
            .map(monster => {
              return {
                ref: this.props.monsterRefs.find(
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
                />
              );
            })}
        </Centered>

        <Centered
          style={
            this.props.isSelectingTarget
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
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
          {this.props.deckCards.length}
          <br />
          Cards in Hand:&nbsp;&nbsp;{this.props.handCards.length}
          <br />
          Discard Pile:&nbsp;&nbsp;&nbsp;
          {this.props.discardCards.length}
          <br />
          Actions:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.allState.battle.currentAP}/
          {this.props.allState.battle.maxAP}
          <br />
        </BattleStats>
        <br />
        <Hand>
          {this.props.handCards
            .map(handCard => {
              return {
                ref: this.props.cardRefs.find(card => card.id === handCard.id),
                card: handCard
              };
            })
            .map(cardInHand => {
              return (
                <Card
                  key={cardInHand.card.uuid}
                  uuid={cardInHand.card.uuid}
                  isActive={
                    this.props.activeCard
                      ? this.props.activeCard.uuid === cardInHand.card.uuid
                      : false
                  }
                  id={cardInHand.card.id}
                  label={cardInHand.ref.name}
                  cost={cardInHand.ref.cost}
                  actions={cardInHand.ref.actions}
                  description={cardInHand.ref.description}
                />
              );
            })}
        </Hand>
        <button onClick={() => this.props.addToBattleTurn(1)}>End Turn</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const allState = selectors.getAllState(state);
  const cardRefs = selectors.getCardRefs(state);
  const monsterRefs = selectors.getMonsterRefs(state);
  const monsters = selectors.getMonstersAlive(state);
  const isSelectingTarget = selectors.getIsSelectingTarget(state);
  const activeCard = selectors.getActiveCard(state);

  const deckCards = selectors.getCardsByDeck(state, 'deck');
  const handCards = selectors.getCardsByDeck(state, 'hand');
  const discardCards = selectors.getCardsByDeck(state, 'discard');

  return {
    allState,
    monsterRefs,
    cardRefs,
    isSelectingTarget,
    activeCard,
    deckCards,
    handCards,
    discardCards,
    monsters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...actionCreators }, dispatch),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
