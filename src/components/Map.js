import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const PortalMap = styled.div`
  display: flex;
`;

const Item = styled.div`
  width: 3rem;
  line-height: 3rem;
  text-align: center;
  border: 2px solid white;
  border-radius: 50%;
  margin: 1rem;

  &:hover {
    cursor: pointer;
  }
}
`;

const Arrow = styled.span`
  display: flex;
  align-items: center;
`;

const mapSize = [1,2,3,4,5];

class Map extends Component {
  render() {
    return (
      <PortalMap>
        {
          mapSize.map((item, index) => {
            return (
              <Fragment>
                <Item>{item}</Item>
                {
                  index !== mapSize.length-1
                  && <Arrow class="arrow">&#8594;</Arrow>
                }
              </Fragment>
            )
          })
        }
      </PortalMap>
    )
  }
};

export default Map;