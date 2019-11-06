import React, { Component } from "react";
import { connect } from "react-redux";

export class Card extends Component {
  label;
  uniqueId;
  key;
  constructor(props) {
    super(props);
    this.label = props.label + ": " + props.value;
    this.key = props.key;
    this.value = props.value;
  }

  action() {
    console.log("attacked");
  }

  render() {
    return (
      <button key={this.key} onClick={() => this.action()}>
        {this.label}
      </button>
    );
  }
}

export default Card;