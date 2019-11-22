import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MonsterSprite } from './Sprites';
import { Sprite, SpriteCanvasHelper } from 'mixel';
import PercentileBar from './PercentileBar';

import { getIsSelectingTarget, getEffectValue } from '../ducks/selectors';

import {
  disableTargetSelection,
  setSelectedTarget,
  playCard
} from '../ducks/actionCreators';

let nextMoveUUID = 0;

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  z-index: 2;
  margin-top: 55px;
  animation: 1s ${bounceAnimation};
  user-select: none;
  user-drag: none;
  cursor: ${props => props.selecting ? 'pointer' : 'default'};
  align-items: center;
  justify-content: center;
  display: flex;

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
  min-width: 110px;
`;

const MoveItem = styled.div`
  font-size: 12px;
  padding: 3px 6px;
`;

const MonsterAvatar = styled.div`
  display: flex;
  flex-direction: column;
  width: 96px;
  & > img {
    user-drag: none;
  }
`;

export class Monster extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = props.id;
    this.uuid = props.uuid;
  }

  componentDidMount() {
    let sprite = new Sprite(MonsterSprite, {
      colored: true,
      colorVariations: 1,
      edgeBrightness: 0.1,
      brightnessNoise: 0.5,
      saturation: 1,
      tint: {
        r: 0.2,
        g: 0.5,
        b: 0,
        a: 1
      }
    });

    let canvas = SpriteCanvasHelper.createCanvas(sprite);
    canvas = SpriteCanvasHelper.resizeCanvas(canvas, 8);
    this.setState({ dataURI: canvas.toDataURL() });
  }

  action() {
    if (this.props.isSelectingTarget) {
      this.props.playCard({ target: this.uuid });
    }
  }

  getQueuedMoveText = (type, value) => {
    let finalAttack = value;

    if (this.props.weakness) { 
      finalAttack = Math.round(value + (value * this.props.weakness));
    }

    switch (true) {
      case type === 'attack' && this.props.weakness !== 0:
        return `deals ${finalAttack} damage (weakened ${this.props.weakness*-100}%)`;
      case type === 'attack':
        return `deals ${finalAttack} damage`;
      case type === 'block':
        return `blocks ${value} damage`;
      default:
        return `does ${value} ${type}`;
    }
  };

  render() {
    return (
      <BouncyDiv onClick={() => this.action()} selecting={this.props.selecting}>
        <MonsterAvatar>
          <img src={this.state.dataURI} alt='Monster' />
          <PercentileBar max={100} value={this.props.hp} fontSize="0.6em" height="20px"/>
        </MonsterAvatar>
        {this.props.monsterMoves !== undefined &&
        <QueuedMoves>
          Next moves
          {this.props.monsterMoves
            .map(move => {
              return (
                <MoveItem key={++nextMoveUUID}>
                  {this.getQueuedMoveText(move.type, move.value)}
                </MoveItem>
              );
            })
          }
        </QueuedMoves>
        }
      </BouncyDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const isSelectingTarget = getIsSelectingTarget(state);
  const weakness = getEffectValue(state, 'weaken', ownProps.uuid);
  return { isSelectingTarget, weakness };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        setSelectedTarget,
        disableTargetSelection,
        playCard,
      },
      dispatch
    ),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monster);
