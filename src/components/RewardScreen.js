import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';

const RewardWrapper = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  margin: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

class RewardScreen extends Component {
  render() {
    return (
      <RewardWrapper>
        <CardContainer onClick={() => console.log('Card1')}>
          <Card />
        </CardContainer>
        <CardContainer onClick={() => console.log('Card2')}>
          <Card />
        </CardContainer>
        <CardContainer onClick={() => console.log('Card3')}>
          <Card />
        </CardContainer>
      </RewardWrapper>
    )
  }
};

export default RewardScreen;