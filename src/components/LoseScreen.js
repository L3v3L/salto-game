import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import * as actionCreators from '../ducks/actionCreators';
import * as selectors from '../ducks/selectors';

import Button from './styles/Button';

const LoseScreenWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

class LoseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<LoseScreenWrapper>
      <h1>You Lost</h1>
      <p>Battles Won: { this.props.gamesWon ? this.props.gamesWon : 0 }</p>
      <div>
        <Button onClick={ () => this.props.setGameState('battle') }>
          Restart
        </Button>
        <Button onClick={ () => this.props.setGameState('main') } marginLeft>
          Main Screen
        </Button>
      </div>
    </LoseScreenWrapper>);
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
