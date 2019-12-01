import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from './Card';
import * as selectors from '../ducks/selectors';
import * as actionCreators from '../ducks/actionCreators';
import SkipButton from './styles/Button';

const RewardWrapper = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  margin: 2rem;
  & > :hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px 20px #fff;
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
              this.props.setGameState('battle', true);
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

        <SkipButton
          centered
          onClick={ () => this.props.setGameState('battle', true) }
          positionTop={ 250 }>
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
