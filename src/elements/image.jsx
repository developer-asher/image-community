import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { src, shape, size } = props;
  const styles = { src, size };

  if (shape === 'circle') {
    return <CircleImg {...styles}></CircleImg>;
  }
  if (shape === 'rectangle') {
    return (
      <Outter>
        <InnerImg {...styles}></InnerImg>
      </Outter>
    );
  }

  return <></>;
};

Image.defaultProps = {
  src: 'https://cdnweb01.wikitree.co.kr/webdata/editor/202103/02/img_20210302105652_f4642f08.webp',
  shape: 'circle',
  size: '30px',
};

const Outter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const InnerImg = styled.div`
  position: relative;
  padding-top: 75%;
  background: url('${(props) => props.src}') no-repeat center;
  background-size: cover;
  overflow: hidden;
`;

const CircleImg = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background: url('${(props) => props.src}') no-repeat center;
  background-size: cover;
`;

export default Image;
