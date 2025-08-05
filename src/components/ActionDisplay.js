import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba, darken } from 'polished';
import { Bolt } from 'styled-icons/boxicons-solid';

const color = 'rgb(0, 170, 114)';
const darkenAmount = 0.15;

const ActionsDiv = styled.div`
  font-weight: bold;
  padding-left: 10px;
  display: inline-block;
  background-color: ${rgba(darken(darkenAmount, color), 1)};
  color: black;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,1px 1px 0 #fff;
  border-radius: 10px;
  border: 2px solid ${rgba(darken(darkenAmount * 2, color), 1)};
  user-select: none;
  .action_display__text{
    display:inline-block;
    vertical-align: middle;

    .current{
        color: white;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        display: inline-block;
        background-color: ${color};
        border: 4px solid ${rgba(darken(darkenAmount / 2, color), 1)};
        border-radius: 0px 10px 10px 0px;
        padding: 4px 0px;
    }
  }
`;

const ActionDisplayBolt = styled(Bolt)`
  color: black;
  height: 24px;
  vertical-align: middle;
  margin-right:3px;
  path{
    stroke: white;
    stroke-width: 2px;
    stroke-linejoin: round;
  }
`;

class ActionDisplay extends Component {
  render() {
    return (
      <ActionsDiv>
        <ActionDisplayBolt/>
        <div className="action_display__text">
          { this.props.max }&nbsp;<span className="current"> { this.props.current } </span>
        </div>
      </ActionsDiv>
    );
  }
}

export default ActionDisplay;
