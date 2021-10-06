import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    is_flex,
    flex_start,
    content_pos,
    position,
    width,
    margin,
    padding,
    bg,
    children,
    onClick,
  } = props;
  const styles = {
    is_flex,
    flex_start,
    content_pos,
    position,
    width,
    margin,
    padding,
    bg,
  };
  return (
    <GridBox {...styles} onClick={onClick}>
      {children}
    </GridBox>
  );
};

Grid.defaultProps = {
  is_flex: false,
  flex_start: 'row',
  width: '100%',
  margin: false,
  padding: false,
  bg: false,
  children: null,
};

// 여기 props는 GridBox 안에서 받은 props 즉, {...styles}가 넘어온다.
const GridBox = styled.div`
  ${(props) => (props.position ? `position:relative;` : ``)}
  ${(props) =>
    props.is_flex
      ? 'display: flex; justify-content: space-between; align-items:center;'
      : ''}
  justify-content: ${(props) => props.content_pos};
  flex-direction: ${(props) => props.flex_start};
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
`;

export default Grid;
