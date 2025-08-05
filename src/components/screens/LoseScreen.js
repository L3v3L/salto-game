import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Glitmage from 'glitmage';
import * as actionCreators from '../../ducks/actionCreators';
import * as selectors from '../../ducks/selectors';

import Button from '../styles/Button';

const LoseScreenWrapper = styled.div`
  text-align: center;
  width: 100%;
  user-select: none;
`;

class LoseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.headerImageRef = null;

    this.setHeaderImageRef = (element) => {
      this.headerImageRef = element;
    };
  }

  componentDidMount() {
    Glitmage(this.headerImageRef);
  }

  render() {
    return (<LoseScreenWrapper>
      <img width="578px" height="160px" alt="glitchy text saying quantum disconnect" src={ 'images/quantumDisconnect.png' } ref={ this.setHeaderImageRef }/>
      <p>Survived { this.props.allState.gamesWon ? this.props.allState.gamesWon : 0 } { this.props.allState.gamesWon === 1 ? 'Leap' : 'Leaps' }</p>
      <div>
        <Button onClick={ () => this.props.setGameState('reset') }>
          Restart Leap
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
