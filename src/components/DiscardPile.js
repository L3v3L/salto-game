import React, { Component } from 'react';
import styled from 'styled-components';

const Pile = styled.div`
  display: flex;
`;

const Card = styled.div`
  width: 50px;
  height: 67px;
  border: 2px solid black;
  border-radius: 4px;
  color: black;
  position: relative;

  &.left {
    background-color: #268bd2;
    margin-right: -35px;
    transform: rotate(150deg);
  }

  &.middle {
    background-color: #eee8d5;
    display: flex;
    align-items: center;
    justify-content: center; 
    z-index:1;
    transform: rotate(30deg);
  }

  &.right {
    margin-left: -35px;
    background-color: #859900;
    transform: rotate(-70deg);
  }
`;

class DiscardPile extends Component {
  render() {
    return (
      <Pile>
      {
        this.props.size > 0
        ? <>
          <Card className="left"></Card>
          <Card className="middle">
            <span>{this.props.size}</span>
          </Card>
          <Card className="right"></Card>
        </>
        : <>
          <Card className="middle">
            <span>{this.props.size}</span>
          </Card>
        </>
      }
    </Pile>
    )
  }
};

export default DiscardPile;