import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import * as game from "../ducks/game";

const CardButton = styled.div`
  font-weight: bold;
  background-color: #495351;
  width: 150px;
  height: 200px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 4px;
  font-size: 14px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  .interiorContainer {
    user-select: none;
    border: 2px solid #2f3534;
    background-color: #9e9f6d;
    height: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      background-color: #667b79;
      .title {
        padding: 3px 5px;
      }
      .cost {
        padding: 3px 5px 0px 7px;
        text-align: right;
        background-color: #79ac99;
        border-radius: 0px 0px 0px 10px;
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
    this.description = props.description
      ? props.description.replace("%value", props.value)
      : "";

    this.actions = props.actions ? props.actions : [];
    this.dispatchQueuedActions = props.dispatchQueuedActions;
    this.shouldDispatchActions = true;
  }

  action() {
    if (this.props.isSelectingCard) {
      this.props.setQueuedActions([]);

      if (this.cost <= this.props.currentAP) {
        if (this.props.actions) {
          this.props.setQueuedActions(
            this.buildActionQueue(this.props.actions)
          );

          if (this.shouldDispatchActions) {
            this.dispatchQueuedActions();
          }
        }
        this.props.decrementPlayerActions(this.cost);
        this.props.removeCardFromHand(this.uuid);
        this.props.addCardToDiscard(this.uuid);
      }
    }
  }

  buildActionQueue(actions) {
    this.shouldDispatchActions = true;
    let actionsToQueue = actions;

    if (actions[0]["type"] === "target") {
      this.props.enableTargetSelection(true);
      this.shouldDispatchActions = false;
      actionsToQueue = actions.slice(1);
    }

    return actionsToQueue
      .map(action => this.createAction(action))
      .filter(action => action);
  }

  createAction(action) {
    switch (action.type) {
      case "attack":
        return game.attackMonster(action.value);

      default:
        break;
    }
  }

  render() {
    return (
      <CardButton key={this.key} onClick={() => this.action()}>
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
  const currentAP = game.getCurrentAP(state);
  const monsters = game.getMonsters(state);
  const isSelectingCard = game.getIsSelectingCard(state);
  const isSelectingTarget = game.getIsSelectingTarget(state);
  return { currentAP, monsters, isSelectingCard, isSelectingTarget };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...game }, dispatch),
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
