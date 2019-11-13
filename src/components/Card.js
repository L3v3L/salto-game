import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import * as selectors from "../ducks/selectors";

import {
  addCardToBattleDeck,
  attackMonster,
  decrementPlayerActions,
  removeCardFromBattleDeck,
  setQueuedActions,
  enableTargetSelection,
  setSelectedTarget,
  playCard
} from "../ducks/actionCreators";

const cardWidth = 150;
const cardHeight = 200;
const innerBorder = 2;

const CardValues = {
  width: cardWidth,
  height: cardHeight,
  innerBorder: innerBorder,
  interiorHeight: cardHeight - 2 * innerBorder
};

const CardButton = styled.div`
  font-weight: bold;
  background-color: #495351;
  width: ${props => props.cardValues.width}px;
  height: ${props => props.cardValues.height}px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 14px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  .interiorContainer {
    user-select: none;
    border: ${props => props.cardValues.innerBorder}px solid #2f3534;
    background-color: #9e9f6d;
    height: ${props => props.cardValues.interiorHeight}px;
    .header {
      display: flex;
      justify-content: space-between;
      background-color: #667b79;
      .title {
        padding: 3px 5px;
      }
      .cost {
        padding: 3px 5px 0 7px;
        text-align: right;
        background-color: #79ac99;
        border-radius: 0 0 0 10px;
        border-left: 2px solid #4b6c60;
        border-bottom: 2px solid #4b6c60;
      }
    }

    .image {
      background-color: whitesmoke;
      width: 100%;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .body {
      padding: 10px;
      text-align: center;
    }
  }
`;

export class Card extends Component {
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
    this.description = props.description
      ? props.description.replace("%value", props.value)
      : "";

    this.actions = props.actions ? props.actions : [];
  }

  action() {
    if (this.props.isSelectingCard) {
      if (this.cost <= this.props.currentAP) {
        this.props.playCard({
          uuid: this.uuid,
        });
      }
    }
  }

  render() {
    return (
      <CardButton
        cardValues={CardValues}
        key={this.key}
        onClick={() => this.action()}
      >
        <div className="interiorContainer">
          <div className="header">
            <div className="title">{this.label}</div>
            {this.cost && <div className="cost">{this.cost}</div>}
          </div>
          <div className="image">
            <image></image>
          </div>

          <div className="body">
            <div>{this.description}</div>
          </div>
        </div>
      </CardButton>
    );
  }
}

const mapStateToProps = state => {
  const currentAP = selectors.getCurrentAP(state);
  const monsters = selectors.getMonsters(state);
  const isSelectingCard = selectors.getIsSelectingCard(state);
  const isSelectingTarget = selectors.getIsSelectingTarget(state);

  return { currentAP, monsters, isSelectingCard, isSelectingTarget };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        addCardToBattleDeck,
        attackMonster,
        decrementPlayerActions,
        removeCardFromBattleDeck,
        setQueuedActions,
        enableTargetSelection,
        setSelectedTarget
      },
      dispatch
    ),
    ...bindActionCreators({
      playCard,
    }, dispatch),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
