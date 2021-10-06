import React from 'react';
import { history } from '../redux/configureStore';
import { Grid, Image, Text } from '../elements';

const Notice = (props) => {
  const { user_name, image_url, post_id } = props;

  return (
    <Grid
      is_flex
      content_pos='flex-start'
      margin='20px 0 0 0'
      padding='20px'
      bg='#cccccc70'
      onClick={() => {
        history.push(`/detail/${post_id}`);
      }}
    >
      <Image src={image_url} size='85px' shape='basic' />
      <Text margin='0 0 0 10px'>
        <strong>{user_name}</strong>님이 게시글에 댓글을 남겼습니다😆
      </Text>
    </Grid>
  );
};

export default Notice;
