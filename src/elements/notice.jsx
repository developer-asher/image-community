import React from 'react';
import { Grid, Image, Text } from '../elements';

const Notice = (props) => {
  return (
    <Grid
      is_flex
      content_pos='flex-start'
      margin='20px 0 0 0'
      padding='20px'
      bg='#cccccc70'
    >
      <Image />
      <Text margin='0 0 0 10px'>
        <strong>nick name</strong>님이 게시글에 댓글을 남겼습니다😆
      </Text>
    </Grid>
  );
};

export default Notice;
