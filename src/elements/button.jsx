import React from 'react';
import styled from 'styled-components';
import { Text } from '.';

const Button = (props) => {
  const { margin, border, radius, padding, bg, text, onClick } = props;
  const styles = {
    margin,
    border,
    radius,
    padding,
    bg,
  };

  return (
    <ButtonBox {...styles} onClick={onClick}>
      <Text color='#fefefe' bold>
        {text}
      </Text>
    </ButtonBox>
  );
};

Button.defaultProps = {
  margin: false,
  border: 'none',
  radius: '0',
  padding: false,
  bg: '#ccc',
};

const ButtonBox = styled.button`
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  border: ${(props) => props.border};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')};
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  background-color: ${(props) => props.bg};
  cursor: pointer;
`;

export default Button;
