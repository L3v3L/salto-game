import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../ducks/actionCreators';
import * as selectors from '../ducks/selectors';

import Button from './styles/Button';

class LoseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <h1>You Lost</h1>
      Battles Won: { this.props.allState.gamesWon ? this.props.allState.gamesWon : 0 }
      <div>
        <Button onClick={ () => this.props.setGameState('battle') }>
          Restart
        </Button>
        <Button onClick={ () => this.props.setGameState('main') } marginLeft>
          Main Screen
        </Button>
      </div>
    </div>);
  }
}


const mapStateToProps = (state) => {
  const allState = selectors.getAllState(state);

  return {
    allState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoseScreen);
