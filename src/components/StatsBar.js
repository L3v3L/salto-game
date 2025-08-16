import React, { Component } from 'react';
import styled from 'styled-components';

import PercentileBar from './PercentileBar';

const Shield = styled.div`
  box-sizing: border-box;
  flex-basis: ${(props) => (props.flexBasis ? `${props.flexBasis}px` : 'auto')};
  position: relative;
  user-select: none;
  height: ${(props) => (props.height ? props.height : '1em')};
  border-radius: 0.2rem;
  margin: 0.4rem;
  background: #1e6ea7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.disabled ? 0 : '0.2rem 0.1rem')};
  &>*{
    flex: 1 auto;
    margin: 0;
    padding: 0;
  }
  box-shadow: ${(props) => (props.disabled > 0 ? 'none' : '0 0 0 2px black')};
  flex-basis: ${(props) => (props.flexBasis ? `${props.flexBasis}px` : 'auto')};
`;

const CurrentValueText = styled.div`
  padding: 0.2rem;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.2rem')};
  flex: 0;
`;

class StatsBar extends Component {
  getBar() {
    return <PercentileBar
      max={ this.props.max }
      value={ this.props.value }
      fontSize="0.6em"
      height="100%"
      flexBasis={ this.props.flexBasis }
    />;
  }

  render() {
    return this.props.shield > 0
      ? <Shield flexBasis={ this.props.flexBasis }>
        { this.getBar() }
        <CurrentValueText fontSize={ this.props.fontSize }>
          { this.props.shield }
        </CurrentValueText>
      </Shield>
      : <Shield disabled flexBasis={ this.props.flexBasis }>
        { this.getBar() }
      </Shield>;
  }
}

export default StatsBar;
