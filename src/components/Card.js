import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { BoltCircle } from 'styled-icons/boxicons-solid';
import * as selectors from '../ducks/selectors';

import {
  deactivateCardFromHand,
  disableTargetSelection,
  playCard,
} from '../ducks/actionCreators';

const cardWidth = 150;
const cardHeight = 200;
const innerBorder = 2;

const CardValues = {
  width: cardWidth,
  height: cardHeight,
  innerBorder,
  interiorHeight: cardHeight - 2 * innerBorder,
};

const CardButton = styled.div`
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
  font-weight: bold;
  background-color: #495351;
  width: ${(props) => props.cardValues.width}px;
  height: ${(props) => props.cardValues.height}px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 14px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  .interiorContainer {
    user-select: none;
    border: ${(props) => props.cardValues.innerBorder}px solid #2f3534;
    background-color: #9e9f6d;
    height: ${(props) => props.cardValues.interiorHeight}px;
    .header {
      display: flex;
      justify-content: space-between;
      background: linear-gradient(
        60deg,
        rgba(84, 58, 183, 1) 0%,
        rgba(0, 172, 193, 1) 100%
      );
      .title {
        padding: 3px 5px;
      }
      .cost {
        .cost_text{
          display:inline-block;
          vertical-align: middle;
        }
        padding: 0px 5px 0 7px;
        background-color: #79ac99;
        border-radius: 0 0 0 10px;
        border-left: 2px solid #4b6c60;
        border-bottom: 2px solid #4b6c60;
      }
    }
    .imageContainer {
      position: relative;
      padding: 5px;
      background-color: whitesmoke;
      box-shadow: inset 0px 0px 12.9px 2px rgba(0, 0, 0, 0.6);
      .status {
        position: absolute;
        width: 100%;
        padding-left: 10px;
      }
      .image {
        width: 100%;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
          user-drag: none;
        }
      }
    }

    .body {
      padding: 10px;
      text-align: center;
    }
  }
`;

const CardBolt = styled(BoltCircle)`
  color: white;
  height: 16px;
  vertical-align: middle;
  margin-right:1px;
  path{
    stroke: black;
    stroke-width: 2px;
    stroke-linejoin: round;
  }
`;

class Card extends Component {
  label;

  uniqueId;

  key;

  description;

  cost;

  value;

  constructor(props) {
    super(props);

    this.label = props.label;
    this.key = props.key;
    this.cost = props.cost;
    this.uuid = props.uuid;
    this.id = props.id;
    this.image = props.image;

    this.description = props.description
      ? props.description.replace('%value', props.value)
      : '';

    this.actions = props.actions ? props.actions : [];
  }

  action() {
    if (this.props.selecting) {
      if (this.cost <= this.props.currentAP) {
        this.props.playCard({
          id: this.id,
          uuid: this.uuid,
        });
      }
    } else if (this.props.isActive) {
      this.props.deactivateCardFromHand(this.uuid);
      this.props.disableTargetSelection();
    }
  }

  render() {
    return (
      <CardButton
        active={ this.props.selecting || this.props.isActive }
        cardValues={ CardValues }
        key={ this.key }
        onClick={ () => this.action() }
      >
        <div className='interiorContainer'>
          <div className='header'>
            <div className='title'>{ this.label }</div>
            { this.cost ? <div className='cost'><CardBolt/><div className="cost_text">{ this.cost }</div></div> : '' }
          </div>
          <div className='imageContainer'>
            <div className='status'>{ this.props.isActive ? 'ACTIVE' : '' }</div>
            <div className='image'>
              <img src={ `images/${this.props.image}` } alt=''></img>
            </div>
          </div>

          <div className='body'>
            <div>{ this.description }</div>
          </div>
        </div>
      </CardButton>
    );
  }
}

const mapStateToProps = (state) => {
  const currentAP = selectors.getCurrentAP(state);
  const monsterRefs = selectors.getMonsterRefs(state);
  const activeCard = selectors.getActiveCard(state);

  return {
    currentAP,
    monsterRefs,
    activeCard,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      playCard,
      deactivateCardFromHand,
      disableTargetSelection,
    },
    dispatch,
  ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
