import React, { Component } from 'react';
import styled from 'styled-components';

const Pile = styled.div`
  display: flex;
  flex-basis: 150px;
  align-self: center;
`;

const Card = styled.div`
  width: 50px;
  height: 67px;
  border: 2px solid black;
  border-radius: 4px;
  color: black;
  position: relative;
  user-select: none;

  &.left {
    background-color: #268bd2;
    margin-right: -35px;
    margin-top: -15px;
  }

  &.middle {
    background-color: #eee8d5;
    display: flex;
    align-items: center;
    justify-content: center; 
    z-index:1;
  }

  &.right {
    margin-left: -35px;
    margin-top: 15px;
    background-color: #859900;
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  margin: 2px;
  background: black;
  border-radius: 50%;
`;

const Square = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  margin: 2px;
  bottom: 0;
  right: 0;
  background: black;
`;

class DeckPile extends Component {
  render() {
    return (
      <Pile>
        {
          this.props.size > 0
            ? <>
              <Card className="left">
                <Circle />
              </Card>
              <Card className="middle">
                <span>{ this.props.size }</span>
              </Card>
              <Card className="right">
                <Square />
              </Card>
            </>
            : <>
              <Card className="middle">
                <span>{ this.props.size }</span>
              </Card>
            </>
        }
      </Pile>
    );
  }
}

export default DeckPile;
