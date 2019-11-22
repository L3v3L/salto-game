import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';

import Card from './Card';
import Monster from './Monster';
import DeckPile from './DeckPile';
import DiscardPile from './DiscardPile';
import PercentileBar from './PercentileBar';

import * as selectors from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import {
  BattleScreen,
  Centered,
  Hand,
  BattleStats,
  EndTurnButton,
  TextStats,
  SelectTarget
} from './styles/BattleStyle';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.resetBattle();
    props.addMonster(1);
    props.addMonster(0);
  }

  endTurn() {
    this.props.addToBattleTurn(1);
  }

  render() {
    const handlers = {
      spaceKey: event => {
        event.preventDefault();
        this.endTurn();
      }
    };

    return (
      <GlobalHotKeys handlers={handlers}>
        <BattleScreen>
          <div className='header-waves'>
            <Centered>
              {this.props.monsters
                .map(monster => {
                  return (
                    <Monster
                      key={monster.uuid}
                      uuid={monster.uuid}
                      id={monster.id}
                      hp={monster.hp}
                      maxHp={monster.ref.hp}

                      monsterMoves={
                        this.props.allState.battle.monsterMoves[
                          monster.uuid
                        ]
                      }

                      selecting={this.props.isSelectingTarget}
                    />
                  );
                })}
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
            <DeckPile
              size={this.props.deckCards.length}
            />
            <TextStats>
            <div>
            <br />
            Turn:    {this.props.allState.battle.turn}
            <br/>
            Actions: {this.props.allState.battle.currentAP}/{this.props.allState.battle.maxAP}
            <br/>
            Hand:    {this.props.handCards.length}
            <br/>
            Shield:  {this.props.shield}
            </div>
            </TextStats>

            <DiscardPile size={this.props.discardCards.length} />
          </BattleStats>

          <Centered>
            <PercentileBar
              max={this.props.allState.player.hp}
              value={this.props.allState.battle.hp}
            />
          </Centered>

          <Hand>
            {this.props.handCards
              .map(handCard => {
                return {
                  ref: this.props.cardRefs.find(
                    card => card.id === handCard.id
                  ),
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
                    image={cardInHand.ref.image}
                    id={cardInHand.card.id}
                    label={cardInHand.ref.name}
                    cost={cardInHand.ref.cost}
                    actions={cardInHand.ref.actions}
                    description={cardInHand.ref.description}
                  />
                );
              })}
          </Hand>

          <EndTurnButton onClick={() => this.endTurn()}>End Turn</EndTurnButton>
        </BattleScreen>
      </GlobalHotKeys>
    );
  }
}

const mapStateToProps = state => {
  const allState = selectors.getAllState(state);
  const cardRefs = selectors.getCardRefs(state);
  const monsters = selectors.getMonstersAliveWithRefs(state);
  const isSelectingTarget = selectors.getIsSelectingTarget(state);
  const activeCard = selectors.getActiveCard(state);

  const deckCards = selectors.getCardsByDeck(state, 'deck');
  const handCards = selectors.getCardsByDeck(state, 'hand');
  const discardCards = selectors.getCardsByDeck(state, 'discard');

  const shield = selectors.getEffectValue(state, 'shield');

  return {
    allState,
    cardRefs,
    isSelectingTarget,
    activeCard,
    deckCards,
    handCards,
    discardCards,
    monsters,
    shield
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...actionCreators }, dispatch),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
