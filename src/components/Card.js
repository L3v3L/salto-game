import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import * as ducks from "../ducks/game";

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
    this.value = props.value;
    this.cost = props.cost;
    this.uniqueId = props.uniqueId;
    this.description = props.description
      ? props.description.replace("%value", props.value)
      : "";

    this.actions = props.actions ? props.actions : [];
  }

  action() {
    if (this.cost <= this.props.remainingActions) {
      if (this.props.actions) {
        this.props.actions.map(action => this.props.dispatch(action));
      }
      this.props.decrementPlayerActions(this.cost);
      this.props.removeCardFromHand(this.uniqueId);
      this.props.addCardToDiscard(this.uniqueId);
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
  const remainingActions = ducks.getPlayerActions(state);
  return { remainingActions };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...ducks }, dispatch),
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
