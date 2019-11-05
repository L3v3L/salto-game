import React, { Component } from "react";
import _ from "lodash";

class Card {
  label;
  uniqueId;
  constructor(label, id) {
    this.label = label;
    this.uniqueId = id;
  }

  action() {
    console.log("attacked");
  }

  component() {
    return (
      <button key={this.uniqueId} onClick={() => this.action()}>
        {this.label}
      </button>
    );
  }
}

class Battle extends Component {
  constructor(props) {
    super(props);

    let nextCardId = 0;
    let deckArray = [];
    let handArray = [];

    for (let index = 0; index < 10; index++) {
      deckArray.push(new Card("Attack " + index, "attack" + index));
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

  attack(value, cost) {
    this.setState(state => ({
      npcHP: state.npcHP - value,
      moves: state.moves - cost
    }));
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
        <div>
          Deck Size: {this.state.deckArray.length}
          <br />
          Discard Size: {this.state.discardArray.length}
          <br />
          Moves: {this.state.moves}
          <br />
          User HP: {this.state.userHP}
          <br />
          NPC HP: {this.state.npcHP}
        </div>

        {this.state.handArray.map(item => item.component())}

        <button onClick={() => this.endTurn()}>End Turn</button>
      </div>
    );
  }
}

export default Battle;
