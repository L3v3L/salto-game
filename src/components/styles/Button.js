import styled from 'styled-components';

const getCenteredStyle = (top = 0) => (`
  position: absolute;
  top: ${top}px;
  left: 50%;
  margin-left: -4rem;
  font-size: 1rem;
`);

const normalStyle = `
  position: relative;
  font-size: 0.9rem;
`;


const Button = styled.button`
  margin-left: ${(props) => (props.marginLeft ? 0.4 : 0)}rem;
  width: 8rem;
  padding: 0.6rem;
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

  ${(props) => (props.centered ? getCenteredStyle(props.positionTop) : normalStyle)}

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

export default Button;
