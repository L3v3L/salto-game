import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../ducks/actionCreators';

class LoseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      You Lost
      <br />
      <button onClick={ () => this.props.setGameState('battle') }>
          Restart
      </button>
      <button onClick={ () => this.props.setGameState('main') }>
          Main Screen
      </button>
    </div>);
  }
}


const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(LoseScreen);
