import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as game from "../ducks/game";
import Battle from "./Battle";
import { CardLibrary } from "./CardLibrary";

export class Game extends Component {
  constructor(props) {
    super(props);

    //initialize player starter deck
    CardLibrary.map(function(item) {
      return props.createCard(item);
    });

    let starterDeck = [{ id: 1, quantity: 5 }, { id: 2, quantity: 5 }];

    starterDeck.map(function(item) {
      for (let i = 0; i < item.quantity; i++) {
        props.addCardToDeck(item.id);
      }
      return null;
    });
  }

  render() {
    return <Battle />;
  }
}

const mapStateToProps = state => {
  const allState = game.getAllState(state);
  return { allState };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...game }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
