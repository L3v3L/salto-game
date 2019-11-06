import React, { Component } from "react";
import _ from "lodash";
import Card from "./Card";
import Monster from "./Monster";

class Battle extends Component {
  constructor(props) {
    super(props);

    let nextCardId = 0;
    let deckArray = [];
    let handArray = [];

    for (let index = 0; index < 10; index++) {
      deckArray.push(
        new Card({ label: "Attack ", value: 2, key: "attack" + index })
      );
    }
    deckArray = _.shuffle(deckArray);

    for (let index = 0; index < 4; index++) {
      handArray.push(deckArray.pop());
    }

    this.state = {
      userHP: 100,
      npcHP: 100,
      handArray: handArray,
      deckArray: deckArray,
      discardArray: [],
      moves: 3,
      maxMoves: 3,
      nextCardId: nextCardId
    };
  }

  endTurn() {
    let newDiscardArray = this.state.discardArray;
    let newHandArray = this.state.handArray;
    let newdeckArray = this.state.deckArray;

    newDiscardArray = newDiscardArray.concat(newHandArray);
    newHandArray = [];

    let newdeckArrayLength = newdeckArray.length;
    for (let index = 0; index < Math.min(4, newdeckArrayLength); index++) {
      newHandArray.push(newdeckArray.pop());
    }

    this.setState(state => ({
      moves: state.maxMoves,
      handArray: newHandArray,
      deckArray: newdeckArray,
      discardArray: newDiscardArray
    }));
  }

  render() {
    return (
      <div>
        <Monster />
        NPC HP: {this.state.npcHP}
        <br />
        <br />
        <div>
          Deck Size: {this.state.deckArray.length}
          <br />
          Discard Size: {this.state.discardArray.length}
          <br />
          Moves: {this.state.moves}
          <br />
          User HP: {this.state.userHP}
          <br />
        </div>
        {this.state.handArray.map(item => item.render())}
        <button onClick={() => this.endTurn()}>End Turn</button>
      </div>
    );
  }
}

export default Battle;
