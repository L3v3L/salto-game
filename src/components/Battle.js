import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';

import Card from './Card';
import Monster from './Monster';
import DeckPile from './DeckPile';
import DiscardPile from './DiscardPile';
import ActionDisplay from './ActionDisplay';
import StatsBar from './StatsBar';

import * as selectors from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import {
  BattleScreen,
  Centered,
  Hand,
  BattleStats,
  TextStats,
  SelectTarget,
} from './styles/BattleStyle';

import EndTurnButton from './styles/Button';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    props.resetBattle({ keepHp: props.allState.isNextBattle });
    props.addMonster(1);
    props.addMonster(0);
  }

  endTurn() {
    this.props.addToBattleTurn(1);
  }

  render() {
    const handlers = {
      spaceKey: (event) => {
        event.preventDefault();
        this.endTurn();
      },
    };

    return (
      <GlobalHotKeys handlers={ handlers }>
        <BattleScreen>
          <div className='header-waves'>
            <Centered>
              { this.props.monsters.map((monster) => (
                <Monster
                  key={ monster.uuid }
                  uuid={ monster.uuid }
                  name={ monster.ref.name }
                  id={ monster.id }
                  hp={ monster.hp }
                  maxHp={ monster.maxHp }
                  monsterMoves={ monster.moves }
                  effects={ monster.effects }
                  selecting={ this.props.isSelectingTarget }
                />
              )) }
            </Centered>
            <div>
              <svg
                className='waves'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                viewBox='0 24 150 28'
                preserveAspectRatio='none'
                shapeRendering='auto'
              >
                <defs>
                  <path
                    id='gentle-wave'
                    d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
                  />
                </defs>
                <g className='parallax'>
                  <use xlinkHref='#gentle-wave' x='48' y='0' />
                  <use xlinkHref='#gentle-wave' x='48' y='3' />
                  <use xlinkHref='#gentle-wave' x='48' y='5' />
                  <use xlinkHref='#gentle-wave' x='48' y='7' />
                </g>
              </svg>
            </div>
          </div>

          <SelectTarget
            style={
              this.props.isSelectingTarget
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
          >
            Select Target
          </SelectTarget>

          <BattleStats>
            <DeckPile size={ this.props.deckCards.length } />
            <TextStats>
              <ActionDisplay current={ this.props.allState.battle.currentAP } max={ this.props.allState.battle.maxAP } ></ActionDisplay>
            </TextStats>
            <DiscardPile size={ this.props.discardCards.length } />
          </BattleStats>

          <Centered>
            <StatsBar
              max={ this.props.allState.battle.maxHp }
              value={ this.props.allState.battle.hp }
              shield={ this.props.shield }
              height='30px'
              flexBasis={ 900 }
            />
          </Centered>

          <Hand>
            { this.props.handCards
              .map((handCard) => ({
                ref: this.props.cardRefs.find(
                  (card) => card.id === handCard.id,
                ),
                card: handCard,
              }))
              .map((cardInHand) => (
                <Card
                  key={ cardInHand.card.uuid }
                  uuid={ cardInHand.card.uuid }
                  selecting={ this.props.isSelectingCard }
                  isActive={
                    this.props.activeCard
                      ? this.props.activeCard.uuid === cardInHand.card.uuid
                      : false
                  }
                  image={ cardInHand.ref.image }
                  id={ cardInHand.card.id }
                  label={ cardInHand.ref.name }
                  cost={ cardInHand.ref.cost }
                  actions={ cardInHand.ref.actions }
                  description={ cardInHand.ref.description }
                />
              )) }
          </Hand>

          <EndTurnButton
            centered
            onClick={ () => this.endTurn() }
            positionTop={ 250 }
          >End Turn</EndTurnButton>
        </BattleScreen>
      </GlobalHotKeys>
    );
  }
}

const mapStateToProps = (state) => {
  const allState = selectors.getAllState(state);
  const cardRefs = selectors.getCardRefs(state);
  const monsters = selectors.getMonstersAliveWithRefs(state);
  const isSelectingTarget = selectors.getIsSelectingTarget(state);
  const isSelectingCard = selectors.getIsSelectingCard(state);
  const activeCard = selectors.getActiveCard(state);

  const deckCards = selectors.getCardsByDeck(state, 'deck');
  const handCards = selectors.getCardsByDeck(state, 'hand');
  const discardCards = selectors.getCardsByDeck(state, 'discard');

  const shield = selectors.getEffectValue(state, 'shield');

  return {
    allState,
    cardRefs,
    isSelectingTarget,
    isSelectingCard,
    activeCard,
    deckCards,
    handCards,
    discardCards,
    monsters,
    shield,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
