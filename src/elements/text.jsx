import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { margin, size, bold, color, center, children } = props;
  const styles = { margin, size, bold, color, center };

  return <TextTemp {...styles}>{children}</TextTemp>;
};

Text.defaultProps = {
  margin: false,
  bold: false,
  size: '14px',
  color: '#333',
};

const TextTemp = styled.div`
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  color: ${(props) => props.color};
  ${(props) => (props.center ? `text-align:center;` : '')}
`;

export default Text;
