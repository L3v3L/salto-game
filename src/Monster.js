import React, { Component } from "react";
import { Sprite, SpriteCanvasHelper } from "mixel";

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
      <div>
        <img width="100px" src={this.state.dataURI} />
      </div>
    );
  }
}

export default Monster;
