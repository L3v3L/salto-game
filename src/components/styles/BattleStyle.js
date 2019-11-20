import styled from 'styled-components';
import { rgba, lighten } from 'polished';

const mixinParalax = function(
  nth,
  alpha,
  color,
  delay,
  duration,
  lightenAmount
) {
  return `
    .parallax > use:nth-child(${nth}) {
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        fill: ${rgba(lighten(lightenAmount, color), alpha)};
      }
    `;
};

const waveColor = '#1b9892';
export const BattleScreen = styled.div`
  .header-waves {
    position: relative;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgb(125, 43, 49) 0%,
      rgb(35, 44, 88) 100%
    );
    color: white;
    .waves {
      position: relative;
      width: 100%;
      height: 15vh;
      margin-bottom: -7px;
      /*safari fix*/
      min-height: 100px;
      max-height: 150px;
      /* Animation */
      .parallax > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }

      ${mixinParalax(1, 0.3, waveColor, -2, 7, 0.0)}
      ${mixinParalax(2, 0.5, waveColor, -3, 10, 0.05)}
      ${mixinParalax(3, 0.7, waveColor, -4, 13, 0.1)}
      ${mixinParalax(4, 1, waveColor, -5, 20, 0.15)}

      @keyframes move-forever {
        0% {
          transform: translate3d(-90px, 0, 0);
        }
        100% {
          transform: translate3d(85px, 0, 0);
        }
      }
    }
    @media (max-width: 768px) {
      .waves {
        height: 40px;
        min-height: 40px;
      }
    }
  }
`;

export const Centered = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

export const Hand = styled.div`
  display: flex;
  & > div {
    margin: 2px;
  }
`;

export const BattleStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: monospace;
`;
