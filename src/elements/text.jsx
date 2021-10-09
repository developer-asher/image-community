import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { width, margin, padding, size, bold, color, center, children } = props;
  const styles = { width, margin, padding, size, bold, color, center };

  return <TextTemp {...styles}>{children}</TextTemp>;
};

Text.defaultProps = {
  width: 'auto',
  margin: false,
  padding: 0,
  bold: false,
  size: '14px',
  color: '#333',
};

const TextTemp = styled.div`
  ${(props) => (props.width ? `width: ${props.width};` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  color: ${(props) => props.color};
  ${(props) => (props.center ? `text-align:center;` : '')}
`;

export default Text;
