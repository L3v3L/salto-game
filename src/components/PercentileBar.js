import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  flex-basis: ${(props) => (props.flexBasis ? props.flexBasis : 'auto')};
  height: ${(props) => (props.height ? props.height : '1em')};
  margin: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  border: ${(props) => (props.shield > 0 ? '7px solid #1e6ea7' : '2px solid black')};
`;

const ShieldBar = styled.div`
  position: relative;
  width: 5%;
  background-color: ${(props) => (props.color ? props.color : '#1e6ea7')};
  height: ${(props) => (props.height ? props.height : '1em')};
  text-align: center;
  user-select: none;
`;

const HealthBar = styled.div`
  width: 100%;
  background-color: ${(props) => (props.color ? props.color : '#420f0e')};
  border-radius: 0.2rem;
  border: 2px solid black;
  height: ${(props) => (props.height ? props.height : '1em')};
  text-align: center;
  user-select: none;
`;

const InnerHealthBar = styled.div`
  position: relative;
  background-color: ${(props) => (props.color ? props.color : '#dc322f')};
  width: ${(props) => (props.width ? props.width : 100)}%;
  border-radius: 0.2rem;
  height: 100%;
`;

const CurrentValueText = styled.div`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.5rem')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class PercentileBar extends Component {
  render() {
    return (
      <Bar
        height={ this.props.height }
        flexBasis={ this.props.flexBasis }
        shield={ this.props.shield }
      >
        <HealthBar
          height={ this.props.height }
          color={ this.props.outerColor }
        >
          <InnerHealthBar
            color={ this.props.innerColor }
            width={ (this.props.value / this.props.max) * 100 }
          >
            <CurrentValueText fontSize={ this.props.fontSize }>
              { this.props.value }
            </CurrentValueText>
          </InnerHealthBar>
        </HealthBar>
        {
          this.props.shield > 0
          && (
            <ShieldBar
              height={ this.props.height }
              color={ this.props.outerColor }
            >
              <CurrentValueText fontSize={ this.props.fontSize }>
                { this.props.shield }
              </CurrentValueText>
            </ShieldBar>
          )
        }
      </Bar>
    );
  }
}

export default PercentileBar;
