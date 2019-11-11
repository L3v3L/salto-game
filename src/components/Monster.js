import { bindActionCreators } from "redux";
import { bounce } from "react-animations";
import { connect } from "react-redux";
import { MonsterSprite } from "./Sprites";
import { Sprite, SpriteCanvasHelper } from "mixel";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

import * as game from "../ducks/game";

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

export class Monster extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = props.id;
    this.uuid = props.uuid;
    this.dispatchQueuedActions = props.dispatchQueuedActions;
  }

  componentDidMount() {
    let sprite = new Sprite(MonsterSprite, {
      colored: true,
      colorVariations: 1,
      edgeBrightness: 0,
      brightnessNoise: 1,
      saturation: 1,
      tint: {
        r: 0.2,
        g: 0.5,
        b: 0,
        a: 1
      }
    });

    const dataURI = SpriteCanvasHelper.createCanvas(sprite).toDataURL();
    this.setState({ dataURI });
  }

  action() {
    if (this.props.isSelectingTarget) {
      this.props.setSelectedTarget(this.uuid);
      this.dispatchQueuedActions();
      this.props.disableTargetSelection();
    }
  }

  render() {
    return (
      <BouncyDiv onClick={() => this.action()}>
        <img width="100px" src={this.state.dataURI} alt="Monster" />
        <br />
        <code>HP: {this.props.hp}</code>
      </BouncyDiv>
    );
  }
}

const mapStateToProps = state => {
  const isSelectingTarget = game.getIsSelectingTarget(state);
  return { isSelectingTarget };
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
)(Monster);