import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { Sprite, SpriteCanvasHelper } from 'mixel';
import { MonsterSprite } from './Sprites';
import StatsBar from './StatsBar';

let nextMoveUUID = 0;
const queuedMoveIconSize = 30;

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  z-index: 2;
  margin-top: 55px;
  animation: 1s ${bounceAnimation};
  user-select: none;
  user-drag: none;
  cursor: ${(props) => (props.selecting ? 'pointer' : 'default')};
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap:wrap;

  & > img {
    flex-basis: 96px;
  }
`;

const QueuedMoves = styled.div`
  margin-left: 20px;
  font-size: 14px;
  background-color: #762b34;
  padding: 6px;
  border: 2px solid #ffffff;
  color: #ffffff;
  border-radius: 4px;
  min-width: 80px;
`;

const MoveItem = styled.div`
  display: flex;
  justify-content: center;
  font-size: 22px;
  padding: 6px;
  font-weight: bold;
  img {
    margin-right: 5px;
  }
`;

const MonsterName = styled.div`
  font-size: 0.8em;
  flex: 0 0 100%;
`;

const MonsterAvatar = styled.div`
  display: flex;
  flex-direction: column;
  width: 96px;
  & > img {
    user-drag: none;
  }
`;

class Monster extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = props.id;
    this.uuid = props.uuid;
  }

  componentDidMount() {
    const sprite = new Sprite(MonsterSprite, {
      colored: true,
      colorVariations: 1,
      edgeBrightness: 0.1,
      brightnessNoise: 0.5,
      saturation: 1,
      tint: {
        r: 0.2,
        g: 0.5,
        b: 0,
        a: 1,
      },
    });

    let canvas = SpriteCanvasHelper.createCanvas(sprite);
    canvas = SpriteCanvasHelper.resizeCanvas(canvas, 8);
    this.setState({ dataURI: canvas.toDataURL() });
  }

  calculateFinalAttack = (value) => {
    if (this.props.weakness) {
      return Math.round(value + (value * this.props.weakness));
    }
    return value;
  };

  getQueuedMoveText = (type, value) => {
    const finalAttack = this.calculateFinalAttack(value);

    switch (true) {
    case type === 'attack' && this.props.weakness !== 0:
      return `deals ${finalAttack} damage (weakened ${this.props.weakness * -100}%)`;
    case type === 'attack':
      return `deals ${finalAttack} damage`;
    case type === 'block':
      return `blocks ${value} damage`;
    default:
      return `does ${value} ${type}`;
    }
  };

  calculateFinalMoveValue = (type, value) => {
    switch (true) {
    case type === 'attack':
      return this.calculateFinalAttack(value);
    case type === 'block':
      return value;
    default:
      return value;
    }
  };

  getQueuedMoveIcon = (type) => {
    switch (true) {
    case type === 'attack':
      return <img src={ 'images/3.svg' }
        width={ queuedMoveIconSize }
        height={ queuedMoveIconSize }
        alt={ 'sword' } />;
    case type === 'block':
      return <img src={ 'images/2.svg' }
        width={ queuedMoveIconSize }
        height={ queuedMoveIconSize }
        alt={ 'shield' } />;
    default:
      return <img src={ 'images/3.svg' }
        width={ queuedMoveIconSize }
        height={ queuedMoveIconSize }
        alt={ 'sword' } />;
    }
  };

  render() {
    return (
      <BouncyDiv
        onClick={ () => this.props.handleClick(this.props.uuid) }
        selecting={ this.props.selecting }>
        <MonsterAvatar>
          <img src={ this.state.dataURI } alt='Monster' />
          <MonsterName>{ this.props.name }</MonsterName>
          <StatsBar
            max={ this.props.maxHp }
            value={ this.props.hp }
            fontSize="0.6em"
            height="20px"
            shield={ this.props.effects.length
              ? this.props.effects.reduce((total, effect) => total + effect.value, 0)
              : '' }/>
        </MonsterAvatar>
        { this.props.monsterMoves.filter((move) => move.type !== 'block').length ? <QueuedMoves>
          {
            this.props.monsterMoves.filter((move) => move.type !== 'block')
              .map((move) => {
                nextMoveUUID += 1;
                return <MoveItem
                  key={ nextMoveUUID }
                  title={ this.getQueuedMoveText(move.type, move.value) }>
                  { this.getQueuedMoveIcon(move.type) }
                  { this.calculateFinalMoveValue(move.type, move.value) }
                </MoveItem>;
              })
          }
        </QueuedMoves> : ''
        }
      </BouncyDiv>
    );
  }
}

export default Monster;
