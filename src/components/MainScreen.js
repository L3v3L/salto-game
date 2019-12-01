import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { keyframes } from 'styled-components';
import { rubberBand } from 'react-animations';
import * as actionCreators from '../ducks/actionCreators';
import Button from './styles/Button';


const animation = keyframes`${rubberBand}`;

const MainScreenWrapper = styled.div`
  text-align: center;
  width: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  &>header {
    &>h1 {
      margin-top: 0;
    }
    &>img {
      animation: 1s ${animation};
      user-drag: none;
    }
  }
`;

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<MainScreenWrapper>
      <header>
        <img width="100px" src={ 'images/logo.svg' } alt=''/>
        <h1>
          Salto
        </h1>
      </header>
      <Button
        onClick={ () => this.props.setGameState('reset') }>
        Start Quantum Leap
      </Button>
    </MainScreenWrapper>);
  }
}


const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(MainScreen);
