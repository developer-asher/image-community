import React from 'react';
import styled from 'styled-components';
import { Text } from '.';

const Button = (props) => {
  const { width, padding, bg, onClick, children } = props;
  const styles = { width, padding, bg };

  return (
    <ButtonBox {...styles} onClick={onClick}>
      {children}
    </ButtonBox>
  );
};

Button.defaultProps = {
  width: '100%',
  padding: '10px',
  bg: '#F5D9B4',
};

const ButtonBox = styled.button`
  width: ${(props) => props.width};
  min-width: 80px;
  border: none;
  border-radius: 10px;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  cursor: pointer;
`;

export default Button;
