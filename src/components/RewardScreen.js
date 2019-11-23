import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';
import * as selectors from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const RewardWrapper = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  margin: 2rem;
  &>:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px 20px #fff;
  }
`;

export const SkipButton = styled.button`
  position: absolute;
  width: 8rem;
  padding: 0.6rem;
  margin-left: -4rem;
  top: 250px;
  left: 50%;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;

  color: #26aeab;
  text-transform: uppercase;
  background: #ffffff;
  border: 4px solid #26aeab;
  border-radius: 6px;
  display: inline-block;
  transition-property: color, border;
  transition-duration: 0.3s
  transition-timing-function: ease-in-out;
  transition-delay: 0s;

  &:active {
    background: #eff;
    transition-property: none;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    font-style: bold;
    box-shadow: 0px 6px 1px rgb(0,0,0,0.1);
    transition-property: color, border;
    transition-duration: 0.3s
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
`;

class RewardScreen extends Component {
  render() {
    return (
      <RewardWrapper>
        <CardContainer onClick={() => {this.props.addCardToDeck(this.props.cards[0].id); this.props.setGameState('battle');}}>
          <Card 
            image={this.props.cards[0].image}
            id={this.props.cards[0].id}
            label={this.props.cards[0].name}
            cost={this.props.cards[0].cost}
            description={this.props.cards[0].description} />
        </CardContainer>
        <CardContainer onClick={() => {this.props.addCardToDeck(this.props.cards[1].id); this.props.setGameState('battle');}}>
          <Card 
            image={this.props.cards[1].image}
            id={this.props.cards[1].id}
            label={this.props.cards[1].name}
            cost={this.props.cards[1].cost}
            description={this.props.cards[1].description} />
        </CardContainer>
        <CardContainer onClick={() => {this.props.addCardToDeck(this.props.cards[2].id); this.props.setGameState('battle');}}>
          <Card 
            image={this.props.cards[2].image}
            id={this.props.cards[2].id}
            label={this.props.cards[2].name}
            cost={this.props.cards[2].cost}
            description={this.props.cards[2].description} />
        </CardContainer>
        <SkipButton onClick={() => this.props.setGameState('battle')}>Skip</SkipButton>
      </RewardWrapper>
    );
  }
}

const mapStateToProps = state => {
  const cards = selectors.getRandomCards(state);

  return {
    cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...actionCreators }, dispatch),
    dispatch
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(RewardScreen);
