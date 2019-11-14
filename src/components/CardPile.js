import React, { Component } from 'react';
import styled from 'styled-components';

const Pile = styled.div`
  // border: 2px solid white;
  color: black;
`;

const Card = styled.div`
  background-color: #495351;
  width: 75px;
  height: 100px;
  padding: 5px;
  border: 2px solid black;
  border-radius: 4px;
  position: relative;

  .interiorContainer {
    font-size: 1.5rem;
    border: 1px solid #2f3534;
    background-color: #9e9f6d;
    height: 100%;

    .header {
      height: 10%;
      display: flex;
      justify-content: space-between;
      background-color: #667b79;

      .cost {
        width: 10px;
        background-color: #79ac99;
        border-radius: 0 0 0 10px;
        border-left: 2px solid #4b6c60;
        border-bottom: 2px solid #4b6c60;
      }
    }

    .image {
      background-color: whitesmoke;
      width: 100%;
      height: 45%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .body {
      height: 45%;
    }
  }
`;

const CardLabel = styled.div`
  text-align: center;
  font-size: 1rem;
  color: white;
`;

class CardPile extends Component {
  render() {
    return (
      <Pile>
        <Card>
          <div className="interiorContainer">
            <div className="header">
              <div className="title"></div>
              <div className="cost"></div>
            </div>
            <div className="image"></div>
            <div className="body"></div>
          </div>
        </Card>
        <CardLabel>{this.props.name}{' '}{this.props.size}</CardLabel>
      </Pile>
    )
  }
};

export default CardPile;