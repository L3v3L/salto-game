import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../ducks/actionCreators';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      Salto
      <br />
      <button onClick={ () => this.props.setGameState('battle') }>
          start game
      </button>
    </div>);
  }
}


const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(MainScreen);
