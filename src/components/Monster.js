import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MonsterSprite } from './Sprites';
import { Sprite, SpriteCanvasHelper } from 'mixel';

import { getIsSelectingTarget, getEffectValue } from '../ducks/selectors';

import {
  disableTargetSelection,
  setSelectedTarget,
  playCard
} from '../ducks/actionCreators';

let nextMoveUUID = 0;

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const QueuedMoves = styled.div`
  margin-top: 10px;
  font-size: 14px;
  min-height: 80px;
  background-color: #495351;
  padding: 6px;
  border: 2px solid black;
  border-radius: 4px;
  min-width: 110px;
`;

const MoveItem = styled.div`
  font-size: 12px;
  padding: 3px 6px;
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
    switch (true) {
      case type === 'attack':
        return 'deals ' + Math.max(value-this.props.weakness, 0) + ' damage' + 
          (this.props.weakness > 0 ? ' (weakened)' : '');
      case type === 'block':
        return 'blocks ' + value + ' damage';
      default:
        return 'does ' + value + ' ' + type;
    }
  };

  render() {
    return (
      <div>
        <BouncyDiv onClick={() => this.action()}>
          <img src={this.state.dataURI} alt='Monster' />
          <br />
          <code>HP: {this.props.hp}</code>
        </BouncyDiv>
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const isSelectingTarget = getIsSelectingTarget(state);
  const weakness = getEffectSum(state, 'weaken', ownProps.uuid);
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
