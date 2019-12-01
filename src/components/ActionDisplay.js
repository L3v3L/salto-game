import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba, darken } from 'polished';

const color = 'rgb(48, 221, 0)';
const darkenAmount = 0.1;

const ActionsDiv = styled.div`
  font-weight: bold;
  padding: 3px 20px;
  display: inline-block;
  background-color: ${rgba(darken(darkenAmount, color), 1)};
  color: black;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,1px 1px 0 #fff;
  border-radius: 10px;
  border: 2px solid ${rgba(darken(darkenAmount * 3, color), 1)};

  .current{
      color: white;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
      display: inline-block;
      background-color: ${color};
      border: 4px solid ${rgba(darken(darkenAmount / 2, color), 1)};
      border-radius: 30px;
      padding: 4px 20px;
  }

`;

class ActionDisplay extends Component {
  render() {
    return (
      <ActionsDiv>
        { this.props.max } &gt;&nbsp;
        <div className="current">
          { this.props.current }
        </div>
      </ActionsDiv>
    );
  }
}

export default ActionDisplay;
