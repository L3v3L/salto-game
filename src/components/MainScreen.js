import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import * as actionCreators from '../ducks/actionCreators';

import Button from './styles/Button';

const MainScreenWrapper = styled.div`
  text-align: center;
  width: 100%;
  user-select: none;
`;

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<MainScreenWrapper>
      <img width="100px" src={ 'images/logo.svg' } alt=''></img>
      <h1>
        Salto
      </h1>
      <Button
        onClick={ () => this.props.setGameState('battle') }>
        Start
      </Button>
    </MainScreenWrapper>);
  }
}


const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(MainScreen);
