import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: relative;
  background-color: #420f0e;
  margin: 0.4rem;
  border-radius: 0.2rem;
  border: 2px solid black;
  height: 2rem;
  text-align: center;
  flex-basis: 900px;
`;

const Health = styled.div`
  background-color: #dc322f;
  border-radius: 0.2rem;
  width: ${props => props.width}%;
  height: 100%;
`;

const HealthPoints = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class PlayerHP extends Component {
  render() {
    return (
      <Bar>
        <Health width={this.props.battleHP/this.props.playerHP*100}></Health>
        <HealthPoints>{this.props.battleHP}</HealthPoints>
      </Bar>
    )
  }
}

export default PlayerHP;
