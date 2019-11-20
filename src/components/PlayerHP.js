import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: relative;
  background-color: #420f0e;
  border-radius: 0.2rem;
  margin: 1rem;
  border: 2px solid black;
  width: 100%;
  height: 2rem;
  text-align: center;
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
        <Health width={this.props.hp}></Health>
        <HealthPoints>{this.props.hp}</HealthPoints>
      </Bar>
    )
  }
}

export default PlayerHP;
