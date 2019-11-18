import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MonsterSprite } from './Sprites';
import { Sprite, SpriteCanvasHelper } from 'mixel';

import { getIsSelectingTarget } from '../ducks/selectors';

import {
  disableTargetSelection,
  setSelectedTarget,
  playCard
} from '../ducks/actionCreators';

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
        return 'deals ' + value + ' damage';
      case type === 'block':
        return 'blocks ' + value + ' damage';
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
        <QueuedMoves>
          Next moves
          {this.props.monsterMoves[this.uuid] !== undefined
            ? this.props.monsterMoves[this.uuid]
              .map(move => {
                return (
                  <MoveItem>
                    {this.getQueuedMoveText(move.type, move.value)}
                  </MoveItem>
                );
              })
            : <MoveItem> No moves queued </MoveItem>
          }
        </QueuedMoves>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const isSelectingTarget = getIsSelectingTarget(state);
  return { isSelectingTarget };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        setSelectedTarget,
        disableTargetSelection,
        playCard
      },
      dispatch
    ),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monster);
