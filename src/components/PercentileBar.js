import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: relative;
  background-color: ${props => props.color ? props.color : '#420f0e'};
  margin: 0.4rem;
  border-radius: 0.2rem;
  border: 2px solid black;
  height: ${props => props.height ? props.height : "1em"};
  flex-basis: ${props => props.flexBasis ? props.flexBasis : 'auto'};
  text-align: center;
  user-select: none;
`;

const InnerBar = styled.div`
  background-color: ${props => props.color ? props.color : '#dc322f'};
  width: ${props => props.width ? props.width : 100}%;
  border-radius: 0.2rem;
  height: 100%;
`;

const CurrentValueText = styled.div`
  font-size: ${props => props.fontSize ? props.fontSize : '1.5rem'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class PercentileBar extends Component {

  render() {
    return (
      <Bar height={this.props.height} flexBasis={this.props.flexBasis} color={this.props.outerColor}>
        <InnerBar color={this.props.innerColor} width={ (this.props.value / this.props.max) * 100 }></InnerBar>
        <CurrentValueText fontSize={this.props.fontSize}>{ this.props.value }</CurrentValueText>
      </Bar>
    );
  }
}

export default PercentileBar;
