import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: relative;
  background-color: ${props => props.outerColor ? props.outerColor : '#420f0e'};
  margin: 0.4rem;
  border-radius: 0.2rem;
  border: 2px solid black;
  height: ${props => props.height ? props.height : 2}rem;
  text-align: center;
  flex-basis: 900px;
  user-select: none;
`;

const InnerBar = styled.div`
  background-color: ${props => props.innerColor ? props.innerColor : '#dc322f'};
  border-radius: 0.2rem;
  height: 100%;
`;

const CurrentValueText = styled.div`
  font-size: ${props => props.labelSize ? props.labelSize : 1.5}rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class PercentileBar extends Component {

  render() {
    return (
      <Bar>
        <InnerBar width={ (this.props.value / this.props.max) * 100 }></InnerBar>
        <CurrentValueText>{ this.props.value }</CurrentValueText>
      </Bar>
    );
  }
}

export default PercentileBar;
