import React from 'react';
import styled from 'styled-components';

import { Grid, Image, Text } from '../elements/index';

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;

  return (
    <Item>
      <Grid is_flex>
        <Grid is_flex content_pos='flex-start'>
          <Image shape='circle' />
          <Text margin='0 20px 0 10px'>{user_name}</Text>
          <Text>{contents}</Text>
        </Grid>
        <Grid is_flex content_pos='flex-end'>
          <Text>{insert_dt}</Text>
        </Grid>
      </Grid>
    </Item>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'mean0',
  user_id: '',
  post_id: 1,
  contents: '귀여운 강아지네요!',
  insert_dt: '2021-01-01 19:00:00',
};

const Item = styled.li`
  margin-bottom: 15px;
`;

export default CommentItem;
