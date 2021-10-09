import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const opacity = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  50% {
    display: block;
    opacity: 1;
  }
  100% {
    display: none;
    opacity: 0;
  }
`;

const Opacity = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  color: pink;
  transform: translateX(-50%) translateY(-50%);
  opacity: 0;
  ${(props) =>
    props.active === true
      ? css`
          animation: ${opacity} 1s 1 linear;
        `
      : ''}
`;

const AniOpacity = (props) => {
  const { children, active } = props;

  return (
    <>
      <Opacity active={active}>{children}</Opacity>
    </>
  );
};

export default AniOpacity;
