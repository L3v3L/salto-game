import React, { Component } from "react";
import { Sprite, SpriteCanvasHelper } from "mixel";
import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

export class Monster extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const MASK = {
      width: 6,
      height: 12,
      mirrorX: true,
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        -1,
        0,
        0,
        0,
        1,
        1,
        -1,
        0,
        0,
        0,
        1,
        1,
        -1,
        0,
        0,
        1,
        1,
        1,
        -1,
        0,
        1,
        1,
        1,
        2,
        2,
        0,
        1,
        1,
        1,
        2,
        2,
        0,
        1,
        1,
        1,
        2,
        2,
        0,
        1,
        1,
        1,
        1,
        -1,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    };
    let sprite = new Sprite(MASK, {
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

  render() {
    return (
      <BouncyDiv>
        <img width="100px" src={this.state.dataURI} />
      </BouncyDiv>
    );
  }
}

export default Monster;
