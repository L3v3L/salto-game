import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../ducks/actionCreators';

import Button from './styles/Button';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <h1>
        Salto
      </h1>
      <Button
        onClick={ () => this.props.setGameState('battle') }>
        Start
      </Button>
    </div>);
  }
}


const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(MainScreen);
