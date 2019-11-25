import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from './Card';
import * as selectors from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';

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
  constructor(props) {
    super(props);
    this.cards = props.cards;
  }

  render() {
    return (
      <RewardWrapper>
        { this.cards.map((card, index) => (
          <CardContainer
            key={ `${card.id}-${index}` }
            onClick={ () => {
              this.props.addCardToDeck(card.id);
              this.props.setGameState('battle');
            } }
          >
            <Card
              image={ card.image }
              id={ card.id }
              label={ card.name }
              cost={ card.cost }
              description={ card.description }
            ></Card>
          </CardContainer>
        )) }

        <SkipButton onClick={ () => this.props.setGameState('battle') }>
          Skip
        </SkipButton>
      </RewardWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const cards = selectors.getRandomCards(state);

  return {
    cards,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ ...actionCreators }, dispatch),
  dispatch,
});


export default connect(mapStateToProps, mapDispatchToProps)(RewardScreen);
