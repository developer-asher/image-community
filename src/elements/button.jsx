import React from 'react';
import styled from 'styled-components';
import { Text } from '.';

const Button = (props) => {
  const { text, onClick } = props;

  return (
    <ButtonBox onClick={onClick}>
      <Text color='#fefefe' bold>
        {text}
      </Text>
    </ButtonBox>
  );
};

const ButtonBox = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: salmon;
  cursor: pointer;
`;

export default Button;
